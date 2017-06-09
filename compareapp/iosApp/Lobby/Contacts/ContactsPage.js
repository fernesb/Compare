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
    FlatList
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import Row from './Row'

export default class ContactsPage extends React.Component{

  constructor(props) {
    super(props);
    
    FlatList.pageSize = 100;
    this.state = {messages: []};
    // this.onSend = this.onSend.bind(this);
  }
  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //         },
  //       },
  //     ],
  //   });
  // }
  // onSend(messages = []) {
  //   this.setState((previousState) => {
  //     return {
  //       messages: GiftedChat.append(previousState.messages, messages),
  //     };
  //   });
  // }
  // render() {
  //   return (
  //     <GiftedChat
  //       messages={this.state.messages}
  //       onSend={this.onSend}
  //       user={{
  //         _id: 1,
  //       }} />
  //   );
  // }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Juliee'},
            {key: 'Julieee'},
            {key: 'Julieeee'},
            {key: 'Juli'},
            {key: 'Jule'},
            {key: 'Juie'},
            {key: 'Jlie'},
            {key: 'ulie'},
            {key: 'aJulie'},
            {key: 'bJulie'},
            {key: 'cJulie'},
            {key: 'vJulie'},
            {key: 'bcJulie'},
            {key: 'nJulie'},
            {key: 'mJulie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          removeClippedSubviews = {false}/>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})