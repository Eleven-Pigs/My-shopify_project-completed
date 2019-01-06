import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button,TextInput, View, TouchableOpacity, Text } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { theme } from '../../constants/Theme'
export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', emailError: '', passwordError: '' };
    }

    loginPressed = () => {
        if(this.state.email.length > 0 && this.state.password.length > 0){
            this.props.onPressed(this.state.email, this.state.password)
        }else{
            if(this.state.email.length <= 0){
                this.setState({emailError: "Email cannot be empty"})
            }
            if(this.state.password.length <= 0){
                this.setState({passwordError:"Password cannot be empty"})
            }
        }
        
    }
    registerPressed = () => {
        this.props.registerPressed()
    }

    render(){
    return(
        <View style = {{textAlign: 'center', justifyContent: 'center', padding: 30}}>
                <Text style = {{textAlign: 'center', fontSize: 18}}>{this.props.shopName}</Text>
                <TextField
                    label="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    error={this.state.emailError}
                />
                <TextField
                    label="Password"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    error={this.state.passwordError}
                />
                <TouchableOpacity disabled={this.props.isFetching} style = {{marginTop: 20, width: '50%', alignSelf: 'center',padding: 10,backgroundColor: this.props.primaryColor}} onPress={this.loginPressed}>
                    <Text style = {{color:'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{width: '50%', alignSelf: 'center', marginTop: 20}} onPress={this.registerPressed}>
                    <Text style = {{color: this.props.primaryColor, textAlign: 'center', fontSize: 15,}}>Register</Text>
                </TouchableOpacity>


        </View>
        )
    }
}

