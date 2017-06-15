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

export default class FriendsProfilePicObjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pics: this.props.objects,
        };

        console.warn(this.props.objects);
    };

    render(){
        return(
            <View style={styles.parentBox}>
                <View style={styles.profilePicBox1}>
                    <Image 
                        style = {{width: '80%', height: '80%'}}
                        source = {require('../ProfilePic/TestPics/audiA8.jpg') } />
                    <Text>Votes: </Text>
                </View>
                
                <View style={styles.profilePicBox2}>
                    <Image 
                        style = {{width: '80%', height: '80%'}}
                        source = {require('../ProfilePic/TestPics/bmw5.jpg') } />
                    <Text>Votes:  </Text>
                </View>

                <View style={styles.profilePicBox3}>
                    <Image 
                        style = {{width: '80%', height: '80%'}}
                        source = {require('../ProfilePic/TestPics/benzSclass.jpg') } />
                    <Text>Votes: </Text>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    parentBox: {
        width: '100%',
        height: '100%',
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