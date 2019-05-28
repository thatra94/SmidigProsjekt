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



export default class Profil extends React.Component {

     static navigationOptions = {
      header: null,
  };

  state = {
    avatar: ""
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


  signOutUser = () => {
    FireBase.getInstance()
      .auth()
        .signOut()
          .then(() => {
            console.log('sign out succesful')
          }).catch(error => console.log('error'))
      }
  
  render() {
    return (
    <View style={styles.backgroundContainer}>
        <View style={styles.TitleContainer}>
            <Text style={styles.pageTitle}>Din profil</Text>
        </View>
        <View style={styles.container}>
            <Image style={styles.profileIcon} source={require('../assets/images/user.png' )}/>
            <TouchableOpacity style={styles.editIconContainer} activeOpacity={0.5}>
                <Image
                source={require('../assets/images/edit.png')}
                style={styles.editIcon} />
                <Text style={styles.TextStyle}></Text>
            </TouchableOpacity>
        
            <Text style={styles.nameUser}>John Doe</Text>
            <Text style={styles.studentUser}>Student</Text>
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
