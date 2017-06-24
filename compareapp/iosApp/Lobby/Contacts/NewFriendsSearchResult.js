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
            token: this.props.token,
            user_two_id: this.props.user_two_id,
            requestSent: false,
        }   
    };

    pressEvent(){
        //emit socket message to insert one line in the database
        alert(this.state.user_two_id);

        var friendRequestObject = {
            token: this.state.token,
            user_two_id: this.state.user_two_id
        }
        this.props.socket.emit('friendRequest',friendRequestObject);
        
        this.props.socket.on('friendRequestAck',function(msg){
            // if request sent successfully
            if(msg == true){
                this.setState({requestSent: true});
            }
        }.bind(this));
    };

    addSubView(){
        if(this.state.requestSent == false){
            return(
                <View>
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
        }else{

            return(
                <View>
                    <Text>Friend Request just sent!</Text>
                </View>
            );
        }
    };

    render(){

        return (
            <View style = {styles.parentBox}>
                {this.addSubView()}
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



