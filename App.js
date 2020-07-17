import React, { Component, useState } from 'react';
import { StyleSheet ,Text ,TouchableOpacity ,View ,TextInput } from 'react-native';

export default function App() {
  

  handleChange = event =>{
    var x = this.setState({ [event.target.name]:event.target.value })
    console.log('test',x);
  }
  handleSubmit = event =>{
    event.preventDefault();
    console.log('User Password : ' + this.state.password)
    console.log('User Email : ' + this.state.email)
    const url ='http://snapi.epitech.eu/inscription'
    const data = { password: this.state.password, email: this.state.email }
    // console.log(data ,'DataTest');
        
    var y = fetch(url, { 
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
 
    })
    .then(res => res.json())
    .catch(err => console.error('Error:', err))
    .then(response => console.log('Success:', response)); 

    console.log(y,'UrlTest');
  }

    render(){
    return (
    <View style={styles.container}>
      <TextInput style={input.container}
      pattern={[/[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}/]} 
      type='email' name='email' 
      placeholder="Email" onChange={this.handleChange}/>  
      <TextInput style={input.container} secureTextEntry={true} name='password' 
      placeholder="Password" onChange={this.handleChange}/>
      <TouchableOpacity
               style = {styles.submitButton}
               onPress = {this.handleSubmit}>
               <Text style = {styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  )}   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginTop: 10
 },submitButtonText:{
    color: 'white'
  } 
});

const input = StyleSheet.create({
  container: {
      height: 50,
      width:250, 
      fontSize: 20,
      backgroundColor: '#ffffff',
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      marginTop: 10,
    }
})