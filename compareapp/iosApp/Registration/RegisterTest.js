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

export default class RegisterTest extends React.Component{
	
	render() {

		const {navigate} = this.props.navigate;
		return (
			
			<View style = {styles.container}>
				<TextInput
					style = {styles.input}
					placeholder = 'Email'
					autoCapitalize = 'none'
					onChangeText = {this.props.updateEmail} />

				<TextInput
					style = {styles.input}
					placeholder = 'Password'
					autoCapitalize = 'none'
					onChangeText = {this.props.updatePassword} />

				<TextInput
					style = {styles.input}
					placeholder = 'Confrim Password'
					autoCapitalize = 'none'
					onChangeText = {this.props.confirmPassword} />

				<TouchableHighlight
					style = {styles.submit}
					onPress = { () => this.props.register(this.props.email, this.props.password, this.props.confirmedPassword), ()=>navigate('Chat') }>
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