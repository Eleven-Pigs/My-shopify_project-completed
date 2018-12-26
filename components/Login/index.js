import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button,TextInput } from 'react-native'


export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    loginPressed = () => {
        console.log(this.state.username, this.state.password)
    }

    render(){
    return(
        <Main>
            <Center>
                <Title>Login</Title>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                />
                <Button onPress={ this.loginPressed } title="Login"/>
            </Center>
        </Main>
        )
    }
}

