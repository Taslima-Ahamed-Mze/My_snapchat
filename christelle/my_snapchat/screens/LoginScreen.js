import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen() {
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
          fetch('http://snapi.epitech.eu/connection', {
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
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
