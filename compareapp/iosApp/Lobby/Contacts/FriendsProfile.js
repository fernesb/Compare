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

export default class FriendsProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.navigation.state.params.user
        }
    };

    static navigationOptions = {
        title: 'Profile',
    };

    render(){
        return (
            <View style={styles.parentBox}>
                <View style={styles.profilePicBox1}>
                    <Image 
                        style = {{width: '80%', height: '80%'}}
                        source = {require('../ProfilePic/TestPics/audiA8.jpg') } />
                    <Text>Votes: {this.state.user} </Text>
                </View>
                
                <View style={styles.profilePicBox2}>
                    <Image 
                        style = {{width: '80%', height: '80%'}}
                        source = {require('../ProfilePic/TestPics/bmw5.jpg') } />
                    <Text>Votes: </Text>
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



