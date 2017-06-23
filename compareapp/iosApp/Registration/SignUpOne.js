import Expo from 'expo';
import React, { Component, PropTypes} from 'react';
import { 	
	StyleSheet, 
	Text, 
	View, 
	NavigatorIOS, 
	TouchableHighlight,  
	TextInput
} from 'react-native';

import {Button, Avatar, SocialIcon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
export default class SignUpOne extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email:'',
        confirmPassword:'',
        password:''
      }
      
      this.socket = this.props.navigation.state.params.socket;
      
    };

    static navigationOptions = {
        header: null
    };

    pressEvent(){
    	
      this.socket.disconnect();
      const {navigate} = this.props.navigation;
      navigate('HomeScreen');
    };

    pressToNext(){

      const {navigate} = this.props.navigation;
    	navigate('SignUpTwo',{
        email: this.state.email,
        password: this.state.password,
        socket: this.socket,
      });
    };

    updatePassword=(text)=>{
      this.setState({password:text});
    };

    updateConfirmPassword=(text)=>{
      this.setState({confirmPassword:text});
    };

    updateEmail=(text)=>{
      this.setState({email:text});
    };

    render(){
        return(
           	<View style={styles.parent} >
           		<View style={styles.facebookLogin}>
           			<SocialIcon
			            title="Sign In With Facebook"
			            button
			            fontWeight="400"
			            type="facebook"/>
           		</View>

           		<View style={styles.signUpForm}>
           			<FormLabel>Email:</FormLabel>
                <FormInput
                  onChangeText={this.updateEmail}/>

                <FormLabel>Password:</FormLabel>
                <FormInput
                  onChangeText={this.updatePassword}/>

                <FormLabel>Confirm Password:</FormLabel>
                <FormInput
                  onChangeText={this.updateConfirmPassword}/>

                <Button 
                    icon={{ name: 'done' }}
                    title="Next"
                    buttonStyle={{ marginTop: 15, backgroundColor: 'purple' }}
                    onPress={()=>{this.pressToNext()}}/>
                <FormValidationMessage></FormValidationMessage>

           		</View>

           		<View style={styles.footer}>
           			<Button 
                  title='Already have an account? Sign In!'
                  backgroundColor='#397af8'
                  onPress = {()=>{this.pressEvent()}}/>
           		</View>
           	</View>
        );
    };
};

const styles = StyleSheet.create ({
	parent:{
		flex:1,
	},
	facebookLogin:{
		flex:5,
		justifyContent: 'center',
	},
	signUpForm:{
		flex:10,
	},
	footer:{
		flex:2,
		justifyContent: 'center',
	}
});

