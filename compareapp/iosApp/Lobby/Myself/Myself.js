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
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    RefreshControl
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {List, ListItem, FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';

export default class Myself extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            currentMomentsList: [],
            token: this.props.token,
            refreshing: false,
            postOne:'',
            postTwo:'',
            postThree:'',
            postFour:'',
            storyId:''
        }

        this.socket = this.props.socket;
    };

    componentDidMount(){
        this.socket.emit('currentMoments',this.state.token);

        this.socket.on('currentMomentsAck',function(msg){
            this.setState({ currentMomentsList: msg.currentMomentsList,
                            storyId: msg.storyId });

        }.bind(this));
    };

    _onRefresh(){
        this.setState({refreshing:true});
        this.socket.emit('currentMoments',this.state.token);

        this.socket.on('currentMomentsAck',function(msg){
            this.setState({ currentMomentsList: msg.currentMomentsList ,
                            refreshing:false,
                            storyId: msg.storyId });
            
        }.bind(this));
    };

    updatePostOne=(text)=>{
        this.setState({postOne:text});
    };

    updatePostTwo=(text)=>{
        this.setState({postTwo:text});
    };

    updatePostThree=(text)=>{
        this.setState({postThree:text});
    };

    updatePostFour=(text)=>{
        this.setState({postFour:text});
    };

    postMoments(){
        var images = [];
        images.push(this.state.postOne);
        images.push(this.state.postTwo);
        images.push(this.state.postThree);
        images.push(this.state.postFour);

        alert(images);
        var object = {
            token: this.state.token,
            storyId: this.state.storyId,
            urls: images
        };

        this.socket.emit('postMoments', object);
    };

    render(){
        return (
            <View style={styles.searchBar}>
                <View >
                    <FormInput
                        onChangeText={this.updatePostOne}/>
                    <FormInput
                        onChangeText={this.updatePostTwo}/>
                    <FormInput
                        onChangeText={this.updatePostThree}/> 
                    <FormInput
                        onChangeText={this.updatePostFour}/>  
                    <Button 
                        icon={{ name: 'done' }}
                        title="Update"
                        buttonStyle={{ marginTop: 15, backgroundColor: 'purple' }}
                        onPress={()=>{this.postMoments()}}/>
                </View>

               
                <ScrollView style={{flex: 1}}  
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)} />
                    }>

                    <View style={styles.contacts}>
                      <List containerStyle={{marginBottom: 20}}>
                        {
                          this.state.currentMomentsList.map((l, i) => (
                              <ListItem
                                hideChevron = {true}
                                roundAvatar
                                key={i}
                                avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                                title={l.url}
                                badge={{ value: l.vote, badgeTextStyle: { color: 'orange' }, badgeContainerStyle: { marginTop: -20 } }}/>
                          ))
                        }
                      </List>
                    </View>

                </ScrollView>
               
            </View>
        );
    };
}

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