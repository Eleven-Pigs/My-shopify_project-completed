import React from 'react';
import { Item, Title, StyledImage, DescriptionContainer, Price } from './style'

export const BestSellingProductItem = ({ product, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            { product.image && <StyledImage
                source={{uri: product.image}}
            /> }
            <DescriptionContainer>
                <Title numberOfLines={2} >{product.title}</Title>
                <Price>{product.currencyCode} {product.minVariantPrice}</Price>
            </DescriptionContainer>
        </Item>
    )
}

