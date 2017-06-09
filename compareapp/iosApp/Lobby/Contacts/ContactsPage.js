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
import Search from 'react-native-search-box';

export default class ContactsPage extends React.Component{

  
  render() {
    return (
     
        <View style={{ flex: 1 }}>
          <Search/>
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

        // <View style={styles.container}>
        //   
        // </View>
      
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