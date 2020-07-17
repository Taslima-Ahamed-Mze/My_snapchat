import  AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { 
  StyleSheet, 
  View, 
  Button, 
  Image, 
  ScrollView, 
  Text,
  TextInput,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export default function Post(props) {

  const [Token] = useState(props.token)
  console.log(props,"tokeeeeenTest");
  
  const [image, setImage] = useState(null);
  const [modalSnap, setModalSnap] = useState(false);
  const [modalSnapCreated, setModalSnapCreated] = useState(false);
  const [modalSnapError, setModalSnapError] = useState(false);
  const [duration, setDuration] = useState('');
  let [users, setUsers] = useState([]);
  let [email, setEmail] = useState('');
  let [localUri, setlocalUri] = useState(null);
 
  

  const takeImage = async () => {
    if (Constants.platform.android || Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      } 
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (!result.cancelled) {
      let image = result.uri;
      let localUri = result.uri;
      setImage(image);
      setlocalUri(localUri);
      fetch('http://snapi.epitech.eu/all', {
            method: 'GET',
            headers: {
              'token': Token
            }, 
          }).then((response) => response.json())
            .then((json) => {
              users = json.data.map((userList) => userList.email) ;
              setUsers(users);
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };

  const pickImage = async () => {
    if (Constants.platform.android || Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      } 
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (!result.cancelled) {
      let image = result.uri;
      let localUri = result.uri;
      setImage(image);
      setlocalUri(localUri);
      fetch('http://snapi.epitech.eu/all', {
            method: 'GET',
            headers: {
              'token': Token
            }, 
          }).then((response) => response.json())
            .then((json) => {
              users = json.data.map((userList) => userList.email) ;
              setUsers(users);
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };

  return (
    
    <View style={styles.container}>
      <Icon  
            name="snapchat-square"
            size={30}
            style={ {color:'#7a42f4',marginRight:300,marginBottom:20}}
            onPress = {()=>{
              fetch('http://snapi.epitech.eu/all', {
            method: 'GET',
            headers: {
              'token': Token
            }, 
          }).then((response) => response.json())
            .then(async (json) => {
              try {
                await AsyncStorage.setItem('token', props.token)
              } catch (err) {
            console.error('Error:', err)
          }
          Actions.allsnap({token: props.token})
          })
            }}>
        </Icon>
        <Icon  
            name="power-off"
            size={30}
            style={ {color:'#7a42f4',marginRight:300}}
            onPress = {()=>{
                AsyncStorage.removeItem('token').then();
                Actions.connection()
            }}>
        </Icon>
      <TouchableOpacity style={styles.buttonCamera} onPress={pickImage}>
        <Text style={styles.textButtonCamera}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCamera} onPress={takeImage}>
        <Text style={styles.textButtonCamera}>Take a picture with the camera</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSnap}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Snap to : {email}</Text>
              <TextInput
                style={styles.durationInput}
                keyboardType = 'numeric'
                placeholder="Duration (seconds)"
                onChangeText={(text) => {
                setDuration(text)
                }}
                defaultValue={duration}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={(e) => {
                  let filename = localUri.split('/').pop();
                  let match = /\.(\w+)$/.exec(filename);
                  let type = match ? `image/${match[1]}` : `image`;
                  let formData = new FormData();
                  formData.append('image', {
                    uri: localUri,
                    name: filename,
                    type: type,
                  });
                  formData.append('duration', duration);
                  formData.append('to', email);
                  fetch('http://snapi.epitech.eu/snap', {
                    method: 'POST',
                    headers: { 
                      'Content-Type': 'multipart/form-data',
                      'token': Token,
                    }, 
                    body: formData,
                  }).then((response) => response.json())
                    .then((json) => {
                      setModalSnap(!modalSnap);
                      setModalSnapCreated(true);
                      console.log(json.data);
                    })
                    .catch((error) => {
                      setModalSnap(!modalSnap);
                      setModalSnapError(true);
                      console.error(error);
                    });
                }}
              >
                <Text style={styles.sendButton}>Send</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.hideButton}
                onPress={() => {
                  setModalSnap(!modalSnap);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSnapCreated}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Snap sent !</Text>
              <TouchableHighlight
                style={styles.hideButton}
                onPress={() => {
                  setModalSnapCreated(!modalSnapCreated);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSnapError}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Error : Snap could not be sent !</Text>
              <TouchableHighlight
                style={styles.hideButton}
                onPress={() => {
                  setModalSnapError(!modalSnapError);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView style={styles.scrollView}>
        { users.map((email, i) => (
          <View key={i} style={styles.scrollViewContainer}>
            <Text key={i}>{ email }</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setModalSnap(true);
                setEmail(email);
              }}
            >
              <Ionicons name='ios-send' size={30} color='#37A8FA'/>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFC00',
    alignItems: 'center',
  },
  buttonCamera: {
    marginBottom: 20,
    backgroundColor: '#37A8FA',
    padding: 10,
    borderRadius: 5
  },
  textButtonCamera: {
    color: 'white',
    fontWeight: '400'
  },
  scrollView: {
    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  scrollViewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageStyle: {
    width: 300, 
    height: 250, 
    marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  hideButton: {
    backgroundColor: "#FFFC00",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 40
  },
  sendButton: {
    marginTop: 15, 
    borderRadius: 20, 
    borderColor: '#000000', 
    padding: 10, 
    backgroundColor: '#FFFC00',
    fontWeight: "bold",
    color: '#37A8FA',
  },
  textStyle: {
    color: "#37A8FA",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  durationInput: {
    height: 40, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#000000', 
    padding: 10, 
    marginTop: 20 
  }
});

