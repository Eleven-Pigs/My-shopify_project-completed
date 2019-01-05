import React from 'react';
import { Title } from './style'
import { Button, View, TouchableOpacity, Text } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { theme } from '../../constants/Theme'

export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    registerPressed = () => {
        this.props.onPressed(this.state.email, this.state.password)
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
                <TouchableOpacity style = {{marginTop: 20, width: '50%', alignSelf: 'center',padding: 10,backgroundColor: theme.background}} onPress={this.registerPressed}>
                    <Text style = {{color:'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>SIGN UP</Text>
                </TouchableOpacity>

        </View>

        )
    }
}

