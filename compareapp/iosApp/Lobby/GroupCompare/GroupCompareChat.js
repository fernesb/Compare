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
	    };

	    this.onSend = this.onSend.bind(this);
	    this.socket = this.props.navigation.state.params.socket;
	    
	    // dynamcially create event name
	    // var eventName = this.state.friendId+this.state.token;
	    // this.socket.on(eventName, function(msg){
	    //   	this.onReceivedMessage(msg);
	    // }.bind(this));

  	};

  	static navigationOptions = ({ navigation }) => ({
	    title: `${navigation.state.params.groupCompareInfo.groupCompareName}` ,
	});

	componentWillMount() {
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
		});
	};

	onSend(messages = []) {
		var object = {
			message: messages[0],
	    	token: this.state.token,
	    	friendId: this.state.friendId
	    };
	    
		this.socket.emit('individualChatMessage', object);
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
				  avatar: 'https://facebook.github.io/react/img/logo_og.png'
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