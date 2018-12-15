import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button, } from 'react-native'

export const ProductDetailComponent = ({ requestProductDetail, text }) => {
    return(
    <Main>
        <Center>

            <Title>{text}</Title>
            <Button onPress={ () => requestProductDetail('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2OTA5MTUzNDAzNTI=') } title="Press Me"/>
        </Center>
    </Main>
    )
}

