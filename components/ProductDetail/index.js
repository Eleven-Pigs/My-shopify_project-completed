import React from 'react';
import { CartView, MainView, VariantImage, Title, VariantView, VariantText, VariantTitle, HeaderView, PriceText, ProductInfoText, ProductInfoView } from './style'
import { Button, Image, TouchableOpacity } from 'react-native'

export const ProductDetailComponent = ({ addToCart, title, availableForSale, descriptionHtml, price, variantTitle, variantImage }) => {
    return (
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
        </MainView>
    )
}

