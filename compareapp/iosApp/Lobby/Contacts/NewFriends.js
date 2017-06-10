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
    ListView,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import IO from 'socket.io-client/dist/socket.io.js';
import { GiftedChat } from 'react-native-gifted-chat';
import Row from './Row'
import Search from 'react-native-search-box';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

export default class NewFriends extends React.Component{
    constructor(props){
    super(props);
    this.state = {
      userId: "",
      text:''
    }
    this.socket = IO('http://localhost:3000'); 
  }

  //send the search info back to database
  searchUser(){
    var searchObject = {
      userName: this.state.userId
    };

    this.socket.emit('searchContacts',searchObject);
    // logic handling data sent back from the backend 
    this.socket.on('searchStatus', function(msg){
      if(msg.status == true){
        console.warn(msg.content[0].id);
      }else{
        console.warn(msg.msg);
      }
    });
  }

  onSearch=()=>{
    // event handler for executing search
    return new Promise((resolve,reject) =>{
      
      resolve(
        this.searchUser()
      );
    });    
    
  }

  onChangeText = (text) => {
    this.setState({userId:text});
  }

  render(){
    return (
        <View style={{flex: 1}}>
            <Search
                onSearch = {this.onSearch}
                onChangeText = {this.onChangeText}/>
        </View>
    )
    
  }
}