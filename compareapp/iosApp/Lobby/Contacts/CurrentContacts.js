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
import DynamicList from './DynamicList'
import Search from 'react-native-search-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List, ListItem} from 'react-native-elements';

const {width, height} = Dimensions.get('window')

export default class CurrentContactsPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: "",
      text:'',
      friendsList: []
    }
    this.socket = IO('http://localhost:3000'); 
    //emit socket info to query friends list
    // hardcoded current user identity UserId: william-ysy (in database)
    
  }

  componentDidMount() {
    this.socket.emit('friendList','william-ysy');

    this.socket.on('friendListAck',function(msg){
      this.setState({friendsList:msg});
      // alert(this.state.friendsList);
    }.bind(this));
  }

  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
  ]

 
  renderFriendList(msg){
    msg.map((item)=>(
      this.state.friendsList.push({name: item.user_two_id})
    ));
  };


  //search the existing users
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
  
  render() {
    return (
      <View style={{flex: 1}}>  
        <View style={styles.searchBar}>
          <Search
            onSearch = {this.onSearch}
            onChangeText = {this.onChangeText}/>

        </View>

        <View style={styles.contacts}>


          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.friendsList.map((l, i) => (
                <ListItem
                  roundAvatar
                  key={i}
                  avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                  title={l.user_two_id}/>
              ))
            }
          </List>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
  },
  input: {
    width: width - (width / 4),
    height: 30,
    backgroundColor: '#323232',
    marginHorizontal: 10,
    paddingLeft: 30,
    borderRadius: 3,
    color: 'grey'
  },
  searchIcon: {
    position: 'absolute',
    top: 5,
    left: 15,
    zIndex: 1,
    backgroundColor:'transparent'
  },
  iconInputClose: {
        position: 'absolute',
        top: 5,
        right: 90,
        backgroundColor: 'transparent',
        zIndex: 1
    },
  cancelButtonText: {
      color: 'white'
  },
  contacts: {
   flex: 12,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});