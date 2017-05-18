import Expo from 'expo';
import React, { Component, PropTypes}from 'react';
import { StyleSheet, Text, View , NavigatorIOS, TouchableHighlight, Button, TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
import LoginComponent from './iosApp/Login'

// below is an example of creating object and reuse the object and passing the props
class Greeting extends React.Component {
  render(){
    return (
      <Text> Hello {this.props.name}, how are you!</Text>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Fernesssss!</Text>
        <Greeting name='Shuyang'/>
        <Greeting name='Mateen'/>
        <Greeting name='YY'/>
      </View>
    );
  }
}
// ////////////////////////////////////

class MyScene extends React.Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }

    _onForward = () => {
        this.props.navigator.push({
          title: 'Scene ' + nextIndex,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this._onForward}>
                  <Text>Tap me to load the next scene</Text>
                </TouchableHighlight>
            </View>
        )
      }

}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcom',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: 'User Name',
            password: 'password'
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <Text>Login Here</Text>
                <TextInput
                    style={styles.registrationFrom}
                    onChangeText={(text) => this.setState({username: text})} 
                    value={this.state.username} />
                <TextInput
                    style={styles.registrationFrom}
                    onChangeText={(text) => this.setState({password: text})} 
                    value={this.state.password} />
                <Button onPress={()=> navigate('Chat')} title="Log In" />
            </View>
        );
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };

    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (

          <View>
            <Text>Chat with Lucy</Text>

          </View>
        );
    }
}


class TestScreen extends Component {
    constructor() {
      super()
      this.state = {
         email: '',
         password: ''
      }
   }
   updateEmail = (text) => {
      this.setState({email: text})
   }
   updatePassword = (text) => {
      this.setState({password: text})
   }
   login = () => {
      alert('email: ' + this.state.email + ' password: ' + this.state.password)
   }

   render(){
      return(
         <View style={styles.container}>
            <LoginComponent
               updateEmail = {this.updateEmail}
               updatePassword = {this.updatePassword}
               login = {this.login} />
         </View>
      )
   }
}

// this is like the stack for each screen
const SimpleApp = StackNavigator({
    Test: { screen: TestScreen },
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },

    registrationFrom: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

Expo.registerRootComponent(SimpleApp);
