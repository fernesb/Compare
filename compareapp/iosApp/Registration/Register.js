import Expo from 'expo';
import React, { Component, PropTypes} from 'react';
import { 	
	StyleSheet, 
	Text, 
	View, 
	NavigatorIOS, 
	TouchableHighlight, 
	Button, 
	TextInput
} from 'react-native';

export default class RegisterComponent extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         email:"",
         password:"",
         confirmedPassword:""
      } 
   }

   updateEmail = (text) => {
      this.setState({email: text })
   }

   updatePassword = (text) => {
      this.setState({password: text })
   }

   updateConfirmedPassword = (text)=> {
      this.setState({confirmedPassword: text })
   }

   pressEvent(){
      
      alert('email: ' + this.state.email + ' password: ' + this.state.password + ' confirmedPassword: '+ this.state.confirmedPassword);
      if( this.state.password != this.state.confirmedPassword) {
         console.warn("Re enter the password");
      } else {
         const {navigate} = this.props.navigate;
         navigate('MainScreen');
      }
   

      
   }

   render(){
      
      return (
         <View style = {styles.container}>
            <TextInput
               style = {styles.input}
               placeholder = 'Email'
               autoCapitalize = 'none'
               onChangeText = {this.updateEmail} />

            <TextInput
               style = {styles.input}
               placeholder = 'Password'
               autoCapitalize = 'none'
               onChangeText = {this.updatePassword} />

            <TextInput
               style = {styles.input}
               placeholder = 'Confrim Password'
               autoCapitalize = 'none'
               onChangeText = {this.updateConfirmedPassword} />

            <TouchableHighlight
               style = {styles.submit}
               onPress = { this.pressEvent.bind(this) }>
               <Text>
                  Sign Up
               </Text>
            </TouchableHighlight>
         </View>
      )
   }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      width: 200,
      borderColor: 'grey',
      borderWidth: 1
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10
   }
})