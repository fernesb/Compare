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
const {width, height} = Dimensions.get('window')

export default class CurrentContactsPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: "",
      text:''
    }
    // this.socket = IO('http://localhost:3000'); 
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
  
  render() {
    return (
      <View style={{flex: 1}}>  
        <View style={styles.searchBar}>
          <Search
            onSearch = {this.onSearch}
            onChangeText = {this.onChangeText}/>

        </View>

        <View style={styles.contacts}>

          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
              {key: 'Juliee'},
              {key: 'Julieee'},
              {key: 'Julieeee'},
              {key: 'Juli'},
              {key: 'Jule'},
              {key: 'Juie'},
              {key: 'Jlie'},
              {key: 'ulie'},
              {key: 'aJulie'},
              {key: 'bJulie'},
              {key: 'cJulie'},
              {key: 'vJulie'},
              {key: 'bcJulie'},
              {key: 'nJulie'},
              {key: 'mJulie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            removeClippedSubviews = {false}/>
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