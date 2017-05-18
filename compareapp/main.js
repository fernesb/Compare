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
import RegisterComponent from './iosApp/Registration/Register'


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
        title: 'Welcome',
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
    constructor(){
        super()
        this.state={
            values: ['Login','Sign Up'],
            value: 'Login',
            selectedIndex: 0,
            subview: 'just testing',
            email: '',
            password: '',
            confirmedPassword: '',
        }
    }

    updateEmail = (text) => {
        this.setState({email: text })
    }

    updatePassword = (text) => {
        this.setState({password: text })
    }

    confirmPassword = (text) => {
        this.setState({confirmedPassword: text })
    }

    login = () => {
        alert('email: ' + this.state.email + ' password: ' + this.state.password)
    }

    register = () => {
        alert('email: ' + this.state.email + ' password: ' + this.state.password + ' confirmPassword: '+ this.state.confirmedPassword)
    }

    static navigationOptions = {
        title: 'Welcome',
    };


    _onChange = (event) => {
        this.setState({
            selectedIndex: event.nativeEvent.selectedSegmentIndex,
        });
    };

    _onValueChange = (value) => {
        // if value == One, then we do this following logic 
        if (value == 'Login') {
            this.setState({
                value: 'Login',
            });
        }

        if (value == 'Sign Up') {
            this.setState({
                value: 'Sign Up',
            });
        }   
    };

    // this function will be executed every time the pram value is changed
    addSubview(){
        if (this.state.value == 'Login'){
            return (
                <View style={styles.AuthBox}>
                
                    <LoginComponent
                       updateEmail = {this.updateEmail}
                       updatePassword = {this.updatePassword}
                       login = {this.login} />  
                    
                </View>
            );
        } 

        if (this.state.value == 'Sign Up') {
            return (
                <View style={styles.AuthBox}>
                
                    <RegisterComponent
                       updateEmail = {this.updateEmail}
                       updatePassword = {this.updatePassword}
                       confirmPassword = {this.confirmPassword}
                       register = {this.register} />  
                    
                </View>
            );
        }
    };

    render(){
        return (
            <View style = {styles.parentBox}>
                
                <View style = {styles.secondBox}>
                    
                    <View style={styles.segmentControll}>
                        <SegmentedControlIOS
                            values={this.state.values} 
                            selectedIndex={this.state.selectedIndex}
                            onChange={this._onChange}
                            onValueChange={this._onValueChange} />
                    </View>

                    {this.addSubview()}

                </View>
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
    // make the main container flexible, this way, the component will take all the available height.
    // the background

    // alighItems position the child or children in its container, alignment of the children along the second axis,
    // for now the secondary axis is x axis, the main one is y axis, the default flex is column

    // justifyContent, determins the distribution of children along the primary aixs.
    parentBox: {
        flex: 1,
        backgroundColor: '#bd92d3',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // below is the second big child under parentBox for registration and login space and segement control
    secondBox: {
        height: '60%',
        width:  '60%',
        backgroundColor: 'blue',
    },

    // nested in secondBox, a block just for segment control 
    segmentControll: {
        backgroundColor: 'white'
    },

    //nestd in sechondBox, a block just for Auth forms, same level with segmentControll
    AuthBox: {
        flex: 3,
        backgroundColor: 'yellow',
        alignItems: 'center',
    },

    registrationFrom: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

Expo.registerRootComponent(SimpleApp);