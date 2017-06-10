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
    }

    render(){

        return (
            <View style = {styles.parentBox}>

                <View style = {styles.profilePicBox}>  
                </View>  
                
                <View style = {styles.infoBox}>
                    <Text>Name: {this.props.userName}</Text>
                    <Text>Email: {this.props.email}</Text>
                </View>
            </View>
        )
    }
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
    }
});



