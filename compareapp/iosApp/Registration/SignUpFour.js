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

export default class SignUpFour extends React.Component {
	
	constructor(props){
      	super(props);

      	this.state = {
	        email: this.props.navigation.state.params.email,
	        password: this.props.navigation.state.params.password,
	        userId: this.props.navigation.state.params.userId,
	        fullName: '',
	        shortInfo:''
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
    	alert(this.state.email+' '+this.state.password+' '+this.state.userId+' '+this.state.fullName+' '+this.state.shortInfo);
    	const {navigate} = this.props.navigation;

    	var signUpInfo = {
    		email: this.state.email,
    		password: this.state.password,
    		userId: this.state.userId,
    		fullname: this.state.fullName,
    		shortinfo: this.state.shortInfo
    	};

    	this.socket.emit('userSignUp', signUpInfo);

    	this.socket.on('SignUpStatus',function(msg){
    		if(msg.status == true){
    			navigate('MainScreen', {
		    		socket: this.socket,
		    		token: msg.token
		    	});
    		}
    	}.bind(this));

    };

    updateFullname=(text)=>{
      	this.setState({fullName:text});
    };

    updateShortInfo=(text)=>{
      	this.setState({shortInfo:text});
    };

	render(){
		return(
			<View style={styles.parent}>
				<View style={styles.title}>
					<Text style={{fontFamily: 'Zapfino', fontSize: 20}}>Lets add some pictures!</Text>
					<Text style={{fontFamily: 'Zapfino', fontSize: 10}}>You can choose up to four profile pictures to join this compare community!</Text>
					
				</View>

				<View style={styles.infoForm}>
					<FormLabel>Fullname:</FormLabel>
                    <FormInput
                    	onChangeText={this.updateFullname}/>

                    <FormLabel>Tell us about your self:</FormLabel>
                    <FormInput
                    	onChangeText={this.updateShortInfo}/>

                    <Button 
                        icon={{ name: 'done' }}
                        title="Next"
                        buttonStyle={{ marginTop: 15, backgroundColor: 'purple' }}
                        onPress={()=>{this.pressToNext()}}/>
		
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
	parent: {
		flex:1,	
	},
	title: {
		flex:5,
		justifyContent: 'center',
		alignItems:'center',
	},
	infoForm:{
		flex: 10,
		width: '100%'
	},
	footer: {
		flex:2,
		justifyContent: 'center',
	}
});