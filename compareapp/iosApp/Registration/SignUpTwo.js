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

export default class SignUpTwo extends React.Component {
	
	static navigationOptions = {
        header: null
    };

    pressEvent(){
    	const {navigate} = this.props.navigation;
    	navigate('HomeScreen');
    };

    onPress(){
    	const {navigate} = this.props.navigation;
    	navigate('SignUpThree');
    };

	render(){
		return(
			<View style={styles.parent}>
				<View style={styles.title}>
					<Text style={styles.appTitle}>Create Username</Text>
					<Text style={{fontFamily: 'Zapfino', fontSize: 15, width:'80%'}}>Use our suggested username or you can come up your own name!</Text>
				</View>

				<View style={styles.usernameForm}>
					<FormLabel
						labelStyle={{marginTop: 60}}>Username:</FormLabel>
                    <FormInput/>
                    <Button 
                        icon={{ name: 'done' }}
                        title="Next"
                        buttonStyle={{ marginTop: 30, backgroundColor: 'purple' }}
                        onPress={()=>{this.onPress()}}/>

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
}

const styles = StyleSheet.create ({
	parent:{
		flex:1,
	},
	title:{
		flex:7,
		justifyContent: 'center',
		alignItems:'center',
	},
	appTitle:{
		fontFamily:'Zapfino',
        fontSize: 25,
	},
	usernameForm:{
		flex:10,
	},
	footer:{
		flex:2,
		justifyContent: 'center',
	}
});