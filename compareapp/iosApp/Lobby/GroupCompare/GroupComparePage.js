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
    ScrollView
} from 'react-native';

import IO from 'socket.io-client/dist/socket.io.js';
import { GiftedChat } from 'react-native-gifted-chat';
import Search from 'react-native-search-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List, ListItem} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

export default class GroupComparePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            groupCompareList: [],
            token: this.props.token
        };
        this.socket = this.props.socket;
    };

    componentDidMount() {
        
        this.socket.emit('groupCompareList',this.state.token);
        // alert(this.state.token);

        this.socket.on('groupCompareListAck',function(msg){
        this.setState({groupCompareList:msg});
        // alert(this.state.friendsList);
        }.bind(this));
    };


    userPageNavigate(object){
        const {navigate} = this.props.navigate;
        navigate('GroupCompareChat',{ 
            socket: this.socket,
            groupCompareInfo: object,
            token: this.state.token });
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>  
                <View style={styles.searchBar}>
                    <Search
                        onSearch = {this.onSearch}
                        onChangeText = {this.onChangeText}/>
                </View>

                <View style={styles.contacts}>
                    <List containerStyle={{marginBottom: 20}}>
                        {
                            this.state.groupCompareList.map((l, i) => (
                                <ListItem
                                    roundAvatar
                                    key={i}
                                    avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                                    title={l.groupCompareName}
                                    button onPress={()=>{this.userPageNavigate(l)}}/>
                            ))
                        }
                    </List>
                </View>
            </ScrollView>
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
  