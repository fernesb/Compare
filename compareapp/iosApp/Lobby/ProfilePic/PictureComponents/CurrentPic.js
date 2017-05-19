import Expo from 'expo';
import React, { Component, PropTypes}from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    NavigatorIOS, 
    TouchableHighlight, 
    Button, 
    TextInput,
    SegmentedControlIOS,
    Image,
} from 'react-native';

export default class CurrentPic extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			url: this.props.url
		}
	}

	render(){
		return (
			<View>
				<Image 
					style = {{width: '100%', height: '100%'}}
	          		source = {require('../TestPics/benzSclass.jpg') } />
			</View>
		)
	}
}