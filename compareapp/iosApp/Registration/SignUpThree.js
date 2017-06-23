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

import {  	Button, 
			Avatar, 
			SocialIcon, 
			FormLabel, 
			FormInput, 
			FormValidationMessage,
			Icon } from 'react-native-elements';

export default class SignUpThree extends React.Component {
	constructor(props){
      	super(props);

      	this.state = {
			email: this.props.navigation.state.params.email,
			password: this.props.navigation.state.params.password,
			userId: this.props.navigation.state.params.userId,

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
    	navigate('SignUpFour', {
    		socket: this.socket,
    		email: this.state.email,
    		password: this.state.password,
    		userId: this.state.userId
    	});
    };


	render(){
		return(
			<View style={styles.parent}>
				<View style={styles.title}>
					<Text style={{fontFamily: 'Zapfino', fontSize: 20}}>Lets add some pictures!</Text>
					<Text style={{fontFamily: 'Zapfino', fontSize: 10}}>You can choose up to four profile pictures to join this compare community!</Text>
					
				</View>

				<View style={styles.addPictures}>
					<Icon
						raised
						name='camera-enhance'/>
					<Button 
                        icon={{ name: 'done' }}
                        title="Next"
                        buttonStyle={{ marginTop: 30, backgroundColor: 'purple', width:'100%' }}
                        onPress={()=>{this.pressToNext()}}/>
				</View>

				<View style={styles.footer}>
					<Button 
                        title='Already have an account? Sign In!'
                        backgroundColor='#397af8'
                        onPress = {()=>{this.pressEvent()}}/>
				</View>
			</View>
		)
	}
};

const styles = StyleSheet.create ({
	parent: {
		flex:1,	
	},
	title: {
		flex:5,
		justifyContent: 'center',
		alignItems:'center',
	},
	addPictures:{
		alignItems:'center',
		flex: 10,
		width: '100%'
	},
	footer: {
		flex:2,
		justifyContent: 'center',
	}
});