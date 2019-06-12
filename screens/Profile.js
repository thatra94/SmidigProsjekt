import React from 'react';
import {ImageEditor, TouchableOpacity} from 'react-native'
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import FireBase from '../components/FireBase';
import {ImagePicker, Permissions} from "expo";
import * as firebase from "firebase";

let fb = FireBase.getInstance();

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    let testUrl = firebase.auth().currentUser.photoURL;
    console.log("testUrl1", testUrl);
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    avatar: "avatar"
  };

  onImageUpload = async () => {
    const {status: cameraRollPerm} = await Permissions.askAsync(
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
      let uploadUrl = await fb.uploadImage(resizedUri);
      console.log("url is", uploadUrl);
      await this.setState({avatar: uploadUrl});
      console.log(" - await upload successful url:" + uploadUrl);
      console.log(" - await upload successful avatar state:" + this.state.avatar);
      await fb.updateAvatar(uploadUrl);
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('En feil oppstod når du skulle last opp bilde:' + err.message);
    }
  };

  async componentWillMount() {
    let user = await firebase.auth().currentUser.photoURL;
    if(user === null){
      user = 'https://firebasestorage.googleapis.com/v0/b/smidigprosjekt-e3cdc.appspot.com/o/avatar%2Fuser.png?alt=media&token=b418ae54-f509-4644-8188-3e266f102c9b'
    }
    this.setState({avatar: user});
    console.log("avatState", this.state.avatar);
  }

  signOutUser = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('sign out succesful')
        }).catch(error => console.log('error'))
  };

  deleteProfile = async () => {
    let userId = await firebase.auth().currentUser.uid;
    let user = await firebase.auth().currentUser;

    firebase.database().ref('users/' + userId).remove();
    user.delete().then(function () {
      console.log("user deleted")
    }).catch(function (error) {
      console.log("error deleting user")
    });
  };
  
  render() {
    return (
    <View style={styles.backgroundContainer}>
        <View style={styles.TitleContainer}>
            <Text style={styles.pageTitle}>Din profil</Text>
        </View>
        <View style={styles.container}>
            <Image style={styles.profileIcon} source={{uri: this.state.avatar}}
            />
            <Text style={styles.nameUser}>{fb.getName()}</Text>
            <Text style={styles.studentUser}>Student</Text>
            <Text style={styles.studyUser}>{fb.getStudy()}</Text>
            <TouchableOpacity onPress={this.onImageUpload} style={styles.avatarBtn}>
                    <Text style={styles.avatarTxt}>Upload Avatar Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => {
              Alert.alert(
                  "Ønsker du å logge ut?",
                  "",
                  [
                      {text: "Avbryt", type: "cancel"},
                      {text: "Logg ut", onPress: () => {this.signOutUser()}, style: 'destructive'}
                  ]
              )}}
              style={styles.profileTxt}>
                    <Text style={styles.logOut}>Logg ut</Text>
                </TouchableOpacity>
                                    
        
            <TouchableOpacity onPress={ () => {
                Alert.alert(
                    "Ønsker du å slette profilen din?",
                    "",
                    [
                      {text: "Avbryt", type: "cancel"},
                      {text: "Slett", onPress: () => {this.deleteProfile()}, style: 'destructive'}
                    ]
                    )}} 
                style={styles.profileTxt}>
                <Text style={styles.profileTxt}>Slett profil</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
    height: 520,
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
    avatarBtn: {
    alignItems: 'center',
    fontSize: 18,
    margin: 9,
    backgroundColor: '#5D1049',
    borderRadius: 100,
    padding: 2,
    width: '60%',
  },
    profileTxt: {
    alignItems: 'center',
    fontSize: 18,
    margin: 7,
  },
    avatarTxt: {
    color: 'white',
    fontSize: 18,
    margin: 7,
  },
    logOut: {
    color: 'red',
    fontSize: 18,
  },

    
});
