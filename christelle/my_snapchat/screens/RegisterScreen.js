import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ListView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function RegisterScreen() {
  const [ Email, setEmail ] = React.useState('');
  const [ Password, setPassword ] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Email"
        onChangeText={(text) => {
        setEmail(text)
        }}
        defaultValue={Email}
      />
      <TextInput
        secureTextEntry={true}
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(text) => {
        setPassword(text)
        }}
        defaultValue={Password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          fetch('http://snapi.epitech.eu/inscription', {
            method: 'POST',
            header: { 
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }, 
            body : {
              "email" : Email,
              "password": Password
            }
          }).then((response) => response.json())
            .then((json) => {
              console.log(json);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

RegisterScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
