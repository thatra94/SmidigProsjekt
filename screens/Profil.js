import React, { Component } from 'react';
import {ImageEditor, TouchableOpacity} from 'react-native'
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button
} from 'react-native';
import FireBase from '../components/FireBase';
import {ImagePicker, Permissions} from "expo";
import * as firebase from "firebase";

//let avatarIMG = {uri: 'https://firebasestorage.googleapis.com/v0/b/smidigprosjekt-e3cdc.appspot.com/o/avatar%2Ff7c507e0-71bf-4088-a588-c7aace7a517a?alt=media&token=657e8a88-8c8e-4b59-9068-14cc14fbfd9e'};

export default class Profil extends React.Component {

  constructor(props) {
    super(props);
    let testUrl = firebase.auth().currentUser.photoURL;
    console.log("testUrl1", testUrl);
  }

     static navigationOptions = {
      header: null,
  };

  state = {
    avatar: "https://firebasestorage.googleapis.com/v0/b/smidigprosjekt-e3cdc.appspot.com/o/avatar%2Ff7748a67-989c-471a-a491-b33a4942e14a?alt=media&token=474bd23d-fab1-4eaa-a041-b6b219b9f8f0"
  };

  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm !== 'granted') {
        return;
      }
      console.log('choosing image granted...');
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
      );
      let wantedMaxSize = 150;
      let rawheight = pickerResult.height;
      let rawwidth = pickerResult.width;
      let ratio = rawwidth / rawheight;
      let wantedwidth = wantedMaxSize;
      let wantedheight = wantedMaxSize / ratio;
      if (rawheight > rawwidth) {
        wantedwidth = wantedMaxSize * ratio;
        wantedheight = wantedMaxSize;
      }
      console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
      let resizedUri = await new Promise((resolve, reject) => {
        ImageEditor.cropImage(pickerResult.uri,
            {
              offset: {x: 0, y: 0},
              size: {width: pickerResult.width, height: pickerResult.height},
              displaySize: {width: wantedwidth, height: wantedheight},
              resizeMode: 'contain',
            },
            (uri) => resolve(uri),
            () => reject(),
        );
      });
      let uploadUrl = await FireBase.getInstance().uploadImage(resizedUri);
      console.log("url is", uploadUrl);
      await this.setState({avatar: uploadUrl});
      console.log(" - await upload successful url:" + uploadUrl);
      console.log(" - await upload successful avatar state:" + this.state.avatar);
      await FireBase.getInstance().updateAvatar(uploadUrl);
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };


  async componentWillMount() {
    let user = await firebase.auth().currentUser.photoURL;
    this.setState({avatar: user});
    console.log("avatState", this.state.avatar);
  }


  signOutUser = () => {
    FireBase.getInstance()
      .auth()
        .signOut()
          .then(() => {
            console.log('sign out succesful')
          }).catch(error => console.log('error'))
      }
  
  render() {
    let avatarImg = "{uri: '"+this.state.avatar+"'}";
    return (
    <View style={styles.backgroundContainer}>
        <View style={styles.TitleContainer}>
            <Text style={styles.pageTitle}>Din profil</Text>
        </View>
        <View style={styles.container}>
            <Image style={styles.profileIcon} source={{uri: this.state.avatar}}
            />
            <TouchableOpacity style={styles.editIconContainer} activeOpacity={0.5}>
                <Image
                source={require('../assets/images/edit.png')}
                style={styles.editIcon} />
                <Text style={styles.TextStyle}></Text>
            </TouchableOpacity>
        
            <Text style={styles.nameUser}>{FireBase.getInstance().getName()}</Text>
            <Text style={styles.studentUser}>Student</Text>
            <Text style={styles.studyUser}>{FireBase.getInstance().getStudy()}</Text>
        
            <Text style={styles.studyUser}>Programmering</Text>

          <Button
              title="Upload Avatar Image"
              style={styles.buttonText}
              onPress={this.onImageUpload}
          />
            <Button color='red' title="Logg ut" onPress={this.signOutUser} />
        </View>
    </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
	   width: 0,
	   height: 3,
    },
    shadowOpacity: 0.50,
    shadowRadius: 4.65,
    elevation: 13,
    width: 340,
    height: 450,
  },
    container2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
    backgroundContainer: {
    backgroundColor: '#5D1049',
    width: '100%',
    height: '100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    pageTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
    nameUser: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
  },
    studyUser: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
  },
    studentUser: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
    profileIcon:{
    marginTop: 40,
    height: '35%',
    width: '100%',
    resizeMode: 'contain',
  },
    editIcon:{
    height: '250%',
    resizeMode: 'contain',
  },
    editIconContainer:{
    position: 'absolute',
    marginTop: 20,
    left: 50,
  },
    interestTitle:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
    interestText:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    marginLeft: 20,
    marginRight: 20,
    fontStyle: 'italic',
  },
    otherIcon:{
    height: '80%',
    width: '100%',
    resizeMode: 'contain',
    flexDirection: 'row',
  },
    iconOne: {
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
  },
    iconTwo: {
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
  },
    iconThree: {
    width:40,
    height:40,
    justifyContent: 'center',
  },
    
});
