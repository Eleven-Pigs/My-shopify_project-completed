import React from 'react';
import { Item, Title, StyledImage, DescriptionContainer, Price } from './style'

export const ProductItem = ({ product, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            {product.image && <StyledImage
                source={{uri: product.image ? product.image : 'https://yoast.com/app/uploads/sites/5/2015/11/Show_post_search_results.png'}}
            />}
            <DescriptionContainer>
                <Title numberOfLines={2} >{product.title}</Title>
                <Price>{product.currencyCode} {product.minVariantPrice}</Price>
            </DescriptionContainer>
        </Item>
    )
}

