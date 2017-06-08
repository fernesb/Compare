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
    SegmentedControlIOS
} from 'react-native';

export default class GroupComparePage extends React.Component{
	render(){
		return (
            <View>
    			<Text>THIS IS GROUP COMPARE PARE</Text>
                <TextInput
                   style = {styles.input}
                   placeholder = 'Email'
                   autoCapitalize = 'none' />
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