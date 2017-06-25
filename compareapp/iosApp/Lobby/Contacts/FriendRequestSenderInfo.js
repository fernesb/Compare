import Expo from 'expo';
import React, { Component, PropTypes}from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    NavigatorIOS, 
    TouchableHighlight, 
    TextInput,
    SegmentedControlIOS,
    ListView,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import { Button, Avatar } from 'react-native-elements';

export default class FriendRequestSenderInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: this.props.navigation.state.params.token,
            accept: false,
            friendId: this.props.navigation.state.params.friendId
        }

        this.socket = this.props.navigation.state.params.socket;
    };

    acceptRequest(){
        alert(this.state.friendId);
        //
        var object = {
            friendId: this.state.friendId,
            token: this.state.token
        };

        this.socket.emit('acceptRequest', object); 

        this.socket.on('acceptRequestAck',function(msg){
            if(msg == true){
                this.setState({accept: true});
            }
        }.bind(this));
    };

    addSubView(){
        if(this.state.accept == false){
            return(
                <View>
                    <Button 
                        title='Accept'
                        backgroundColor='#397af8'
                        onPress={ ()=>{this.acceptRequest()} }/>

                    <Button 
                        title='Decline'
                        backgroundColor='purple'
                        onPress={ ()=>{this.acceptRequest} }/>
                </View>
            );
        }else{
            return(
                <View>
                    <Text>Just accepted the friend request</Text>
                </View>
            )
        }
    };

    render(){
        return(
            <View style={styles.parentBox}>
                {this.addSubView()}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    parentBox:{
        flex: 1
    },
});