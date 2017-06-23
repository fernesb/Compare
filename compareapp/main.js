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
    AsyncStorage
} from 'react-native';

import IO from 'socket.io-client/dist/socket.io.js';
import {StackNavigator} from 'react-navigation';
import {TabNavigator} from 'react-navigation';
import {Button, Avatar} from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import LoginComponent from './iosApp/Registration/Login';
import SignUpOne from './iosApp/Registration/SignUpOne';
import SignUpTwo from './iosApp/Registration/SignUpTwo';
import SignUpThree from './iosApp/Registration/SignUpThree';
import SignUpFour from './iosApp/Registration/SignUpFour';

import RegisterComponent from './iosApp/Registration/Register';
import SettingPage from './iosApp/Lobby/Settings/SettingPage';
import ProfilePicPage from './iosApp/Lobby/ProfilePic/ProfilePicPage';
import GroupComparePage from './iosApp/Lobby/GroupCompare/GroupComparePage';
import ContactsPage from './iosApp/Lobby/Contacts/ContactsPage';
import TopBarIconExample from './iosApp/Lobby/lobby';
import TestLobby from './iosApp/Lobby/testLobby';

import FriendsProfilePage from './iosApp/Lobby/Contacts/FriendsProfile';


// test out for segment control element
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            values: ['Login','Sign Up'],
            value: 'Login',
            selectedIndex: 0,
            subview: 'just testing',
            email: '',
            password: '',
            confirmedPassword: '',
        }
        this.socket = IO('http://localhost:3000');
        
        this.socket.emit('handshake','IOS: this is a new client and just connected to the server');
    }


    // functions to handle data when users type in information 
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
        this.sendMessage();
    }

    register = () => {
        alert('email: ' + this.state.email + ' password: ' + this.state.password + ' confirmPassword: '+ this.state.confirmedPassword)
    }

    // setup for navigation bar 

    static navigationOptions = {
        title: 'Welcome',
    };

    // functions to handle the segment control
    _onChange = (event) => {
        this.socket.emit('handshake','Test triggers');
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

    // function to add new subviews on the page to display different components 
    // this function will be executed every time the pram value is changed
    addSubview(){


        if (this.state.value == 'Login'){
            return (
                <View style={styles.AuthBox}>
                
                    <LoginComponent
                       navigate = {this.props.navigation} 
                       socket = {this.socket}/>  
                    
                </View>
            );
        } 

        if (this.state.value == 'Sign Up') {
            return (
                <View style={styles.AuthBox}>
                
                    <RegisterComponent
                       navigate = {this.props.navigation} 
                       socket = {this.socket}/>  
                    
                </View>
            );
        }
    };

    // this is part rendering the initial page
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


class WelcomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId:'',
            password:'',
        }
        this.socket = IO('http://9f6f2eef.ngrok.io',{jsonp: false},{transports: ['websocket']});
    }
    static navigationOptions = {
        header: null
    };

    pressEvent(){
        // const {navigate} = this.props.navigation;
        // navigate('SignUpOne');
        // value = AsyncStorage.getItem('token');
        
    };

    pressToLogin(){
        console.log(this.state.userId+this.state.password);
        const {navigate} = this.props.navigation;

        var loginInfo = {
            userId: this.state.userId,
            password: this.state.password
        }; 

        this.socket.emit('userLogin',loginInfo);
        
        this.socket.on('loginStatus', function(msg){
            if(msg.status==true){
                navigate('MainScreen',{
                    socket: this.socket,
                    token: msg.token
                });
            }
        }.bind(this));
    };

    updatePassword=(text)=>{
        this.setState({password:text});
    };

    updateUserId=(text)=>{
        this.setState({userId:text});
    };

    render(){
        return(
            <View style={styles.parentBox}>
                <View style={styles.body}>

                    <View style={styles.logo}>
                        <Text style={styles.appTitle}>Research</Text>
                    </View>

                    <View style={styles.loginForm}>
                        <FormLabel>UserId:</FormLabel>
                        <FormInput
                            onChangeText={this.updateUserId}/>
                        <FormLabel>password:</FormLabel>
                        <FormInput
                            onChangeText={this.updatePassword}/>
                        <Button 
                            icon={{ name: 'done' }}
                            title="Login"
                            buttonStyle={{ marginTop: 15, backgroundColor: 'purple' }}
                            onPress={()=>{this.pressToLogin()}}/>
                        <FormValidationMessage></FormValidationMessage>
                    </View>

                </View>

                <View style={styles.footer}>
                    <Button 
                        title='Dont have an account yet? Sign Up!'
                        backgroundColor='#397af8'
                        onPress = {()=>{this.pressEvent()}}/>
                </View>
            </View>
        );
    };
};


// this is like the stack for each screen
const SimpleApp = StackNavigator({
    HomeScreen: { screen: WelcomePage },
    SignUpOne:  { screen: SignUpOne },
    SignUpTwo:  { screen: SignUpTwo},
    SignUpThree:  { screen: SignUpThree},
    SignUpFour: {screen: SignUpFour},
    MainScreen : {screen: TestLobby},
    // MainScreen: { screen: TopBarIconExample },
    FriendsProfileScreen: { screen: FriendsProfilePage }
});


// In the future can remove the style sheet out side of this file and import it back in
const styles = StyleSheet.create({
    // make the main container flexible, this way, the component will take all the available height.
    // the background

    // alighItems position the child or children in its container, alignment of the children along the second axis,
    // for now the secondary axis is x axis, the main one is y axis, the default flex is column

    // justifyContent, determins the distribution of children along the primary aixs.
    parentBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    body:{
        width: '100%',
        height:'100%',
        flex: 11,
    },
    footer: {
        flex:1,
        width:'100%',
        height:'100%',
    },

    loginForm:{
        flex:2,
    },

    logo:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    appTitle:{
        fontFamily:'Zapfino',
        fontSize: 30,
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
