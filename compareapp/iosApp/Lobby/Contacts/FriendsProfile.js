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
    ScrollView,
    Image
} from 'react-native';

import FriendsProfilePicObjects from './FriendsProfilePicObjects';

export default class FriendsProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            friendId: this.props.navigation.state.params.friendId, // logged in user id 
            profilePicObjects:[],
            voteStatus:false
        }
 
    };

    componentWillMount(){
        this.socket = this.props.navigation.state.params.socket;
        this.socket.emit('profilePicsRequest', this.state.friendId);
        this.socket.on('profilePicsRequestAck',function(msg){
            this.setState({profilePicObjects: msg});
        }.bind(this));

        var voteStatusInfo = {
            user_one_id :'william-ysy',
            user_two_id :this.state.friendId
        };

        this.socket.emit('voteStatus',voteStatusInfo);
        this.socket.on('voteStatusAck',function(msg){
            if(msg==true){
                this.setState({voteStatus: true});
            }
        }.bind(this));
    }   

    static navigationOptions = {
        title: 'Profile',
    };

    addSubview(){
        if(this.state.voteStatus == false){
            return(<Text>Not voted yet</Text>);
        }else {
            return(<Text>Voted already</Text>);   
        }
    }

    pressEvent(photoId){
        this.setState({voteStatus:true});

        var voteInfo = {
            user_one_id :'william-ysy',
            user_two_id :this.state.friendId,
            photoId: photoId
        };

        this.socket.emit('vote',voteInfo);
        this.socket.on('voteAck',function(msg){
            this.setState({profilePicObjects: msg});
        }.bind(this));
    }

    render(){
        return (
            
            <View style={styles.parentBox}>
            {this.addSubview()}
                {
                    this.state.profilePicObjects.map((item,index)=>(
                    
                        <View key={index} style = {styles.profilePicBox1}>
                            <TouchableHighlight 
                                onPress={()=>{this.pressEvent(item.id)}}>
                                <Image
                                    style = {{width: '80%', height: '80%'}}
                                    source = {require('../ProfilePic/TestPics/audiA8.jpg')}/>
                            </TouchableHighlight>
                            <Text>Votes: {item.votes}</Text>
                        </View>
                    ))
                }
            </View>
        );
    };
};

const styles = StyleSheet.create({
    parentBox: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicBox1: {
        height: '30%',
        width:'60%',
        backgroundColor: 'green',
    },
    profilePicBox2: {
        height: '30%',
        width:'60%',
        backgroundColor: 'red',
    },
    profilePicBox3: {
        height: '30%',
        width:'60%',
        backgroundColor: 'grey',
    },
});



