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
	constructor(props){
      super(props);
      this.state = {
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password,
        userId:'',
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

    onPress(){
    	alert(this.state.email+this.state.password+this.state.userId);

    	const {navigate} = this.props.navigation;
    	navigate('SignUpThree',{
    		socket: this.socket,
    		email: this.state.email,
    		password: this.state.password,
    		userId: this.state.userId
    	});
    };

    updateUserId=(text)=>{
      	this.setState({userId:text});
    };

	render(){
		return(
			<View style={styles.parent}>
				<View style={styles.title}>
					<Text style={styles.appTitle}>Create UserId</Text>
					<Text style={{fontFamily: 'Zapfino', fontSize: 15, width:'80%'}}>Use our suggested username or you can come up your own name!</Text>
				</View>

				<View style={styles.usernameForm}>
					<FormLabel
						labelStyle={{marginTop: 60}}>Username:</FormLabel>
                    <FormInput
                     	onChangeText={this.updateUserId}/>
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