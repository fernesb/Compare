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

import {StackNavigator} from 'react-navigation';
import LoginComponent from './iosApp/Registration/Login'


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

// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Welcom',
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             username: 'User Name',
//             password: 'password'
//         };
//     }

//     render() {
//         const {navigate} = this.props.navigation;
//         return (

//             <View style={styles.container}>
//                 <Text>Login Here</Text>
//                 <TextInput
//                     style={styles.registrationFrom}
//                     onChangeText={(text) => this.setState({username: text})} 
//                     value={this.state.username} />
//                 <TextInput
//                     style={styles.registrationFrom}
//                     onChangeText={(text) => this.setState({password: text})} 
//                     value={this.state.password} />
//                 <Button onPress={()=> navigate('Chat')} title="Log In" />
//             </View>
//         );
//     }
// }

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


class HomeScreen extends Component {
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

    static navigationOptions = {
        title: 'Welcom',
    };


    render(){

        return(
            <View style={styles.AuthBox}>
                
                <SegmentedControlIOS values={['Sign Up', 'Log In']} selectedIndex={0} style={{width: 200}} />
                
                <LoginComponent
                   updateEmail = {this.updateEmail}
                   updatePassword = {this.updatePassword}
                   login = {this.login} />  
                
            </View>
        )
    }
}

// test out for segment control element
class SegmentControll extends Component {
    state = {
        values: ['One','Two','Three'],
        value: 'One',
        selectedIndex: 0,
        subview: 'just testing',
    };

    _onChange = (event) => {
        this.setState({
            selectedIndex: event.nativeEvent.selectedSegmentIndex,
        });
    };

    _onValueChange = (value) => {
        // if value == One, then we do this following logic 
        if (value == 'One') {
            this.setState({
                value: 'One',
            });
        }

        if (value == 'Two') {
            this.setState({
                value: 'Two',
            });
        }

        if (value == 'Three') {
            this.setState({
                value: 'Three',
            });
        }
            
    };

    // this function will be executed every time the pram value is changed
    addSubview(){
        if (this.state.value == 'One'){
            return (
                <Text style={styles.text} >
                    subview: 'hahaha1'
                </Text>
            );
        } 

        if (this.state.value == 'Two') {
            return (
                <Text style={styles.text} >
                    subview: 'hahaha2'
                </Text>
            );
        }

        if (this.state.value == 'Three') {
            return (
                <Text style={styles.text} >
                    subview: 'hahaha3'
                </Text>
            );
        }
    };

    render(){
        return (
            <View>
                <Text style={styles.text} >
                  Value: {this.state.value}
                </Text>

                <Text style={styles.text} >
                  Index: {this.state.selectedIndex}
                </Text>

                <SegmentedControlIOS
                    values={this.state.values} 
                    selectedIndex={this.state.selectedIndex}
                    onChange={this._onChange}
                    onValueChange={this._onValueChange} />

                {this.addSubview()}
            </View>
        );
    };

}


// this is like the stack for each screen
const SimpleApp = StackNavigator({
    Seg : { screen: SegmentControll },
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});



const styles = StyleSheet.create({
    AuthBox: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    registrationFrom: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

Expo.registerRootComponent(SimpleApp);
