import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button, } from 'react-native'

export const RegisterComponent = ({ loginPressed }) => {
    return(
    <Main>
        <Center>

            <Title>Register</Title>
            <Button onPress={ () =>  loginPressed } title="Login"/>
        </Center>
    </Main>
    )
}

