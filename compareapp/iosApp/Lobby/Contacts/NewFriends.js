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
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from 'react-native-search-box';
import NewFriendsSearchResult from './NewFriendsSearchResult'

export default class NewFriends extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            text:'',
            searchStatus: false,
            friendEmail:'',
            friendUserName:''
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
                this.setState({
                    searchStatus: true,
                    friendUserName: msg.content[0].username,
                    friendEmail: msg.content[0].email,
                });

            }else{
                console.warn(msg.msg);
            }
        }.bind(this));
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

    addSubview(){
        if(this.state.searchStatus == false){
            return (<Text>Sir</Text>)
        }else{
            return (
                <NewFriendsSearchResult
                    userName ={this.state.friendUserName} 
                    email = {this.state.friendEmail}/>
            )
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.searchBar}>
                    <Search
                        onSearch = {this.onSearch}
                        onChangeText = {this.onChangeText}/>
                </View>

                <View style={styles.searchResult}>
                    {this.addSubview()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar:{
        flex:1,
    },
    searchResult:{
        flex:12,
        backgroundColor:'yellow',
    }
});
