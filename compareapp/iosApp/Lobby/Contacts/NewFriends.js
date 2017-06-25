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
import {List, ListItem} from 'react-native-elements';

export default class NewFriends extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            text:'',
            searchStatus: false,
            friendEmail:'',
            friendUserName:'',
            user_two_id:'',
            token: this.props.token,
            requestSentFriendsList: [],
        }
        this.socket = this.props.socket;

        this.props.socket.emit('requestSentFriendsList',this.state.token);
        
        // keep real-time updating the request sent list
        this.props.socket.on('requestSentFriendsListAck',function(msg){
          this.setState({requestSentFriendsList:msg});
          // alert(this.state.friendsList);
        }.bind(this));
    };

    //modify this to do a fuzzu search in current contacts
    // componentDidMount() {

    // };


    searchUser(){
        var searchObject = {
            token: this.state.token,
            userName: this.state.userId
        };

        this.socket.emit('searchContacts',searchObject);
        // logic handling data sent back from the backend 
        this.socket.on('searchStatus', function(msg){
            if(msg.status == true){

                this.setState({
                    searchStatus: true,
                    friendUserName: msg.content[0].fullName,
                    friendEmail: msg.content[0].email,
                    user_two_id: msg.content[0].userId,
                });

            }else{
                console.warn(msg.msg);
            }
        }.bind(this));
    };

    onSearch=()=>{
        // event handler for executing search
        return new Promise((resolve,reject) =>{
      
            resolve(
                this.searchUser()
            );
        });    
    };

    onChangeText = (text) => {
        this.setState({userId:text});
    };

    // navigate to next page 
    switchPage(){
        const {navigate} = this.props.navigate;
        navigate('NewFriendsSearchPage',{
            socket: this.socket,
            token: this.state.token
        });
    }

    onFocus=()=>{
        
        return new Promise((resolve,reject)=>{
            resolve(
                this.switchPage()
            );
        });
    }


    // navigator for each cell
    userPageNavigate(id){
        const {navigate} = this.props.navigate;

        navigate('FriendRequestSenderInfo',{ 
            socket: this.socket,
            token: this.state.token,
            friendId: id
        });

    }
   
    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.searchBar}>
                    <Search
                        onSearch = {this.onSearch}
                        onChangeText = {this.onChangeText}
                        onFocus = {this.onFocus}/>
                </View>

                <View style={styles.contacts}>
                    <List containerStyle={{marginBottom: 20}}>
                        {
                          this.state.requestSentFriendsList.map((l, i) => (
                              <ListItem
                                roundAvatar
                                key={i}
                                avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                                title={l.friendId}
                                button onPress={()=>{this.userPageNavigate(l.friendId)}}/>
                          ))
                        }
                    </List>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar:{
        flex:1,
    },
    contacts: {
       flex: 12,
    },
});
