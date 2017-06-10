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

export default class NewFriendsSearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_one_id:'william-ysy',
            user_two_id: this.props.user_two_id,
        }   
    };

    pressEvent(){
        //emit socket message to insert one line in the database
        alert(this.state.user_two_id);

        var friendRequestObject = {
            user_one_id: this.state.user_one_id,
            user_two_id: this.state.user_two_id
        }
        this.props.socket.emit('friendRequest',friendRequestObject);
    };

    render(){

        return (
            <View style = {styles.parentBox}>

                <View style = {styles.profilePicBox}>  
                </View>  
                
                <View style = {styles.infoBox}>
                    <Text>Name: {this.props.userName}</Text>
                    <Text>Email: {this.props.email}</Text>
                    
                    <TouchableHighlight
                       style = {styles.submit}
                       onPress = {this.pressEvent.bind(this) } >
                       <Text>Send Friend Request</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    parentBox:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicBox:{
        backgroundColor:'green',
        width: '30%',
        height: '20%',
    },
    infoBox:{
        backgroundColor:'white',
        width: '60%',
        height: '30%',
        marginTop: 10,
    },
    submit: {
      backgroundColor: 'silver',
      padding: 10
    }
});



