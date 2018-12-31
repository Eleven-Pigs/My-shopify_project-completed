import React from 'react';
import { Title, HeaderView, PriceText, ProductInfoText, ProductInfoView } from './style'
import { Main } from '../Styled'
import { Button, } from 'react-native'

export const ProductDetailComponent = ({addToCart, title, availableForSale, descriptionHtml, price, variantTitle }) => {
    return(
    <Main>
        <HeaderView>
            <Title>{title}</Title>
            <PriceText>{price}</PriceText>
        </HeaderView>
        <ProductInfoView>
            <ProductInfoText>Product Option</ProductInfoText>
            <ProductInfoText>{variantTitle}</ProductInfoText>
        </ProductInfoView>
        <ProductInfoView>
            <ProductInfoText>Product Info</ProductInfoText>
        </ProductInfoView>
            <Button onPress={ () =>  addToCart({variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==', quantity: 1}) } title="Add To Cart"/>
    </Main>
    )
}

