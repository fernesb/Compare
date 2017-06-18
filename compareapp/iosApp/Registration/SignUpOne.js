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
	static navigationOptions = {
        header: null
    };

    pressEvent(){
    	const {navigate} = this.props.navigation;
    	navigate('HomeScreen');
    };

    pressToNext(){
    	const {navigate} = this.props.navigation;
    	navigate('SignUpTwo');
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
                    <FormInput/>

                    <FormLabel>Password:</FormLabel>
                    <FormInput/>

                    <FormLabel>Confirm Password:</FormLabel>
                    <FormInput/>
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

