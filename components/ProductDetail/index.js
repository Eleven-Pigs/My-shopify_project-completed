import React from 'react';
import { Title } from './style'
import { Main, Center } from '../Styled'
import { Button, } from 'react-native'

export const ProductDetailComponent = ({addToCart, title, availableForSale, descriptionHtml, price }) => {
    return(
    <Main>
            <Title>{title}</Title>
            <Title>{price}</Title>
            <Button onPress={ () =>  addToCart({variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==', quantity: 1}) } title="Add To Cart"/>
    </Main>
    )
}

