import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button, } from 'react-native'

export const ProductDetailComponent = ({addToCart, text }) => {
    return(
    <Main>
        <Center>

            <Title>{text}</Title>
            <Button onPress={ () =>  addToCart({variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNjQ3NTE3MTU1MzM0NA==', quantity: 1}) } title="Add To Cart"/>
        </Center>
    </Main>
    )
}

