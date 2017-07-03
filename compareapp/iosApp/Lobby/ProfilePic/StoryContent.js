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

export default class StoryContent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            storyId: this.props.navigation.state.params.storiesInfo.storyId,
            momentsList: [],
            token: this.props.navigation.state.params.token
        }

        this.socket = this.props.navigation.state.params.socket;

    };

    componentDidMount() {
        var object = {
            token: this.state.token,
            storyId: this.state.storyId
        };

        this.socket.emit('momentsList',object);
        
        this.socket.on('momentsListAck',function(msg){
            this.setState({momentsList:msg});
        
        }.bind(this));
    };


    vote(id) {
        var object = {
            token: this.state.token,
            postId: id
        }
        
        this.socket.emit('vote',object);
    };

    render() {
        return (
            <ScrollView style={{flex: 1}}>  

                <View style={styles.contacts}>
                  <List containerStyle={{marginBottom: 20}}>
                    {
                      this.state.momentsList.map((l, i) => (
                          <ListItem
                            roundAvatar
                            key={i}
                            avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                            title={l.url}
                            button onPress={()=>{this.vote(l.id)}}/>
                      ))
                    }
                  </List>
                </View>

            </ScrollView>
        );
    };
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

