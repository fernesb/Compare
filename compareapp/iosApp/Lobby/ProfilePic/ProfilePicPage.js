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
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import CurrentPic from './PictureComponents/CurrentPic'
const {width, height} = Dimensions.get('window');
import {List, ListItem} from 'react-native-elements';

export default class ProfilePicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            text:'',
            storiesList: [],
            token: this.props.token
        }

        this.socket = this.props.socket;

    };

    componentDidMount() {
        this.socket.emit('storiesList',this.state.token);
        // alert(this.state.token);

        this.socket.on('storiesListAck',function(msg){
            this.setState({storiesList:msg});
          // alert(this.state.friendsList);
        }.bind(this));
    };

    userPageNavigate(object){
        const {navigate} = this.props.navigate;
        navigate('StoryContent',{ 
            socket: this.socket,
            storiesInfo: object,
            token: this.state.token });
    };


    render() {
        return (
            <ScrollView style={{flex: 1}}>  

                <View style={styles.contacts}>
                  <List containerStyle={{marginBottom: 20}}>
                    {
                      this.state.storiesList.map((l, i) => (
                          <ListItem
                            roundAvatar
                            key={i}
                            avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                            title={l.post_by}
                            subtitle={l.storyName}
                            button onPress={()=>{this.userPageNavigate(l)}}/>
                      ))
                    }
                  </List>
                </View>

            </ScrollView>
        );
    }
};

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