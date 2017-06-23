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

export default class SettingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: this.props.token,
        }
        
        this.socket = this.props.socket;
        
    };

    logout(){
        
        this.socket.emit('logout', this.state.token);
        this.socket.disconnect();
    
        const {navigate} = this.props.navigate;
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
    }
}