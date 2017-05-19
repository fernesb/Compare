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
    Image
} from 'react-native';

import CurrentPic from './PictureComponents/CurrentPic'

export default class ProfilePicPage extends React.Component{
    render(){
        return (
            <View style = {styles.parentBox}>
                <View style = {styles.CurrentPicBox}>
                    <CurrentPic />
                </View>

                <View style = {styles.uploadedPicBox}>
                    <View style = {styles.individualPicBox}>
                        <Image 
                            style = {{width: '100%', height: '100%'}}
                            source = {require('./TestPics/audiA8.jpg') } />
                    </View>

                    <View style = {styles.individualPicBox}>
                        <Image 
                            style = {{width: '100%', height: '100%'}}
                            source = {require('./TestPics/bmw5.jpg') } />
                    </View>

                    <View style = {styles.individualPicBox}>
                        <Image 
                            style = {{width: '100%', height: '100%'}}
                            source = {require('./TestPics/lexus500c.jpg') } />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parentBox: {
        flex:1,
        backgroundColor:'#7BD1ED',
        alignItems:'center'
    },

    CurrentPicBox: {
        marginTop: '15%',
        width: '60%',
        height: '40%',
        backgroundColor: '#E1AEF2'
    },

    uploadedPicBox: {
        flexDirection: 'row',
        width: '90%',
        height: '30%',
        marginTop: '10%',
        backgroundColor: '#AEF2E2',
        alignItems:'center',
        justifyContent: 'center'
    },

    individualPicBox: {
        width: 85,
        height: 85,
        margin: '2%',
        backgroundColor: '#F2E4AE'
    }
});

