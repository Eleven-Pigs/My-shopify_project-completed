import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button,TextInput } from 'react-native'


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
        <Main>
            <Center>
                <Title>Login</Title>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                />
                <Button onPress={ this.registerPressed } title="Register"/>
            </Center>
        </Main>
        )
    }
}

