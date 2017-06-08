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
      const {navigate} = this.props.navigate;
      // alert('email: ' + this.state.email + ' password: ' + this.state.password + ' confirmedPassword: '+ this.state.confirmedPassword);
      // if the entered password and the confirmed password don't match
      if( this.state.password != this.state.confirmedPassword) {
         console.warn("Re enter the password");
      } else {
         var registerInfo = {
            email: this.state.email,
            password: this.state.password
         }
         this.props.socket.emit('register', registerInfo );

         this.props.socket.on('registerStatus',function(msg){
             
            if(msg.status == false){
               console.warn(msg.msg);
               
            } else {
               navigate('MainScreen');
            }
      
         });

         // this.props.socket.removeListener('registerStatus');
        
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