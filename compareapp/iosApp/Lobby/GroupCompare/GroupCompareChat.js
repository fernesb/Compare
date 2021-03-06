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
    SegmentedControlIOS
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class GroupCompareChat extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      	messages: [],
	     	token: this.props.navigation.state.params.token,
	     	groupCompareInfo: this.props.navigation.state.params.groupCompareInfo,
	     	groupCompareId: this.props.navigation.state.params.groupCompareInfo.groupCompareId,
	     	url: 'https://facebook.github.io/react/img/logo_og.png'
	    };

	    this.onSend = this.onSend.bind(this);
	    this.socket = this.props.navigation.state.params.socket;
	    
	    //dynamcially create event name
	    var eventName = this.state.groupCompareId
	    this.socket.on(eventName, function(msg){
	      	this.onReceivedMessage(msg);
	    }.bind(this));

  	};

  	static navigationOptions = ({ navigation }) => ({
	    title: `${navigation.state.params.groupCompareInfo.groupCompareName}` ,
	});

	componentWillMount() {
		var seed = 0;
        var name = this.state.token;

        for( var j = 0; j < name.length; j++ )
            seed += ( name.charCodeAt(j) * j * 37 );
        seed = seed.toString( 16 );
        var hash = '327b8763d4f0039dab25572ee873caaa';
        hash = hash.substring( 0, hash.length - seed.length ) + seed;
        var theurl = 'http://www.gravatar.com/avatar/' + hash + '?s=30&d=monsterid&r=PG';


		this.setState({
			messages: [
				{
				  	_id: 1,
				  	text: 'Hello developer',
				  	createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
				  	user: {
					    _id: 2,
					    name: 'React Native',
					    avatar: 'https://facebook.github.io/react/img/logo_og.png',
				    },
				},
			],

			url: theurl,
		});
	};

	onSend(messages = []) {
		var object = {
			message: messages[0],
	    	token: this.state.token,
	    	groupId: this.state.groupCompareId
	    };
	    
		this.socket.emit('groupChatMessage', object);
		this._storeMessages(messages);
	};

	onReceivedMessage(messages){
		this._storeMessages(messages);
	};

	//helper function
	_storeMessages(messages){
		this.setState((previousState) => {
		  return {
		    messages: GiftedChat.append(previousState.messages, messages),
		  };
		});
	};

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={this.onSend}
				user={{
				  _id: this.state.token,
				  avatar: this.state.url
				}} />
		);
	};
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      width: 200,
      borderColor: 'grey',
      borderWidth: 1
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10
   }
});