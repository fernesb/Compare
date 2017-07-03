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
    Animated
} from 'react-native';

import {TabNavigator} from 'react-navigation';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import ContactsPage from './Contacts/ContactsPage';
import GroupComparePage from './GroupCompare/GroupComparePage';
import ProfilePicPage from './ProfilePic/ProfilePicPage';
import Myself from './Myself/Myself';
import SettingPage from './Settings/SettingPage';


export default class Lobby extends Component {

  constructor(props){
    super(props);
    this.state = {
      token: this.props.navigation.state.params.token,
      index: 0,
      routes: [
        { key: '1', title: 'Me' },
        { key: '2', title: 'Profile Pic' },
        { key: '3', title: 'Contacts'},
        { key: '4', title: 'Setting'}
      ],
    }
    
    this.socket = this.props.navigation.state.params.socket;
    
  };

  static navigationOptions = {
    title: 'Compare',
    headerLeft: null
  };

  static title = 'Bottom bar with indicator';
  static appbarElevation = 4;

  static propTypes = {
    style: View.propTypes.style,
  };


  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderIndicator = (props) => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[ styles.container, { width, transform: [ { translateX } ] } ]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderFooter = (props) => {
    return (
      <TabBar
        {...props}
        
        renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab} />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <Myself 
                navigate = {this.props.navigation}
                socket = {this.socket}
                token = {this.state.token} />;
      case '2':
        return <ProfilePicPage 
                navigate = {this.props.navigation}
                socket = {this.socket}
                token = {this.state.token} />;
      case '3':
        return <ContactsPage 
                  navigate = {this.props.navigation}
                  token = {this.state.token}
                  // userId = {this.props.navigation.state.params.userId}
                  // userName ={this.props.navigation.state.params.userName}
                  socket = {this.socket} />
      case '4':
        return <SettingPage
                navigate = {this.props.navigation} 
                socket = {this.socket} 
                token = {this.state.token} />
      default:
        return null;
    }
  };

    render() {
        return (
          <TabViewAnimated
            style={[ styles.container, this.props.style ]}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderFooter={this._renderFooter}
            onRequestChangeTab={this._handleChangeTab}/>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 4,
    borderRadius: 2,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

