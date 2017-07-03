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
        }

        this.socket = this.props.socket;
    };

    componentDidMount(){
        this.socket.emit('currentMoments',this.state.token);

        this.socket.on('currentMomentsAck',function(msg){
            this.setState({currentMomentsList:msg});

        }.bind(this));
    };

    _onRefresh(){
        this.setState({refreshing:true});
        this.socket.emit('currentMoments',this.state.token);

        this.socket.on('currentMomentsAck',function(msg){
            this.setState({currentMomentsList:msg});
            this.setState({refreshing:false});
        }.bind(this));
    };

    render(){
        return (
            <View style={styles.searchBar}>
                <View >
                    <FormInput
                        onChangeText={this.updateUserId}/>
                    <FormInput
                        onChangeText={this.updateUserId}/>
                    <FormInput
                        onChangeText={this.updateUserId}/> 
                    <FormInput
                        onChangeText={this.updateUserId}/>  
                    <Button 
                        icon={{ name: 'done' }}
                        title="Post"
                        buttonStyle={{ marginTop: 15, backgroundColor: 'purple' }}
                        onPress={()=>{this.pressToLogin()}}/>
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