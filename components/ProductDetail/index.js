import React from 'react';
import { MainView, VariantImage, Title, VariantView, VariantText, VariantTitle, HeaderView, PriceText, ProductInfoText, ProductInfoView } from './style'
import { Button, Image, TouchableOpacity } from 'react-native'

export const ProductDetailComponent = ({addToCart, title, availableForSale, descriptionHtml, price, variantTitle, variantImage }) => {
    return(
    <MainView>
        <HeaderView>
            <Title>{title}</Title>
            <PriceText>More Info</PriceText>
        </HeaderView>
        <VariantView>
            <TouchableOpacity>
                <VariantText>Selected Variant</VariantText>
                <VariantTitle>{variantTitle}</VariantTitle>
            </TouchableOpacity>
        </VariantView>
            <Button onPress={ () =>  addToCart({variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==', quantity: 1}) } title="Add To Cart"/>
    </MainView>
    )
}

