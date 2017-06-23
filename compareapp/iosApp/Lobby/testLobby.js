import Expo from 'expo';
import React, { Component, PropTypes} from 'react';
import { 	
	StyleSheet, 
	Text, 
	View, 
	NavigatorIOS, 
	TouchableHighlight, 
	TextInput,

} from 'react-native';

import {Button, Avatar} from 'react-native-elements';
export default class TestLobby extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			token: this.props.navigation.state.params.token,
		}
		
		this.socket = this.props.navigation.state.params.socket;
		
	};

	logout(){
		
		this.socket.emit('logout', this.state.token);
		this.socket.disconnect();
	
		const {navigate} = this.props.navigation;
        navigate('HomeScreen');
	};

	render(){
		return(
			<View>
				<Text>{this.state.token}</Text>
				<Button
					title="log out"
					onPress={()=>{this.logout()}} />
			</View>
		);
	};
};

