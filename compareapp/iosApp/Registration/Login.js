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

export default class LoginComponent extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         email:"",
         password:"",
      } 
   }

   updateEmail = (text) => {
      this.setState({email: text })
   }

   updatePassword = (text) => {
      this.setState({password: text })
   }

   // when this component unmounut, remove certain socket listener to prvent multiple triggers and
   // and kill the old active listeners


   // event handler for pressing the button
   pressEvent(){
      // using a alert to test email and password update
      // alert('email: ' + this.state.email + ' password: ' + this.state.password)
      const {navigate} = this.props.navigate;
      const socketParam = this.props.socket;
      var loginInfo = {
         email: this.state.email,
         password: this.state.password
      }; 

      this.props.socket.emit('login', loginInfo);

      this.props.socket.on('loginStatus',function(msg){
         
         if(msg.status == false){
            console.warn(msg.msg);
      
         } else {
            navigate('MainScreen',
               {  socket: socketParam,
                  userId: msg.userId,
                  userName: msg.userName
               }
            );
         }
      });
   }

   render() {
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

            <TouchableHighlight
               style = {styles.submit}
               onPress = {this.pressEvent.bind(this) } >
               <Text>
                  Login
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