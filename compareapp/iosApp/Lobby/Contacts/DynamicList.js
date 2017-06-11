import React from 'react';
import {  
  View, 
  Text,
  StyleSheet, 
  Image 
} from 'react-native';

import DynamicListRow from './DynamicListRow'

export default class DynamicList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1,row2) => true
      }),
      refreshing: false
    }
  };

  _renderRow(rowData, sectionId, rowID){
    return (
      <DynamicListRow />
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <ListView 
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow.bind(this)} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});