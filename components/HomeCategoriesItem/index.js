import React from 'react';
import { Item, Title, ItemContainer, StyledImage } from './style'

export const HomeCategoriesItem = ({ collection, onPressItem, index }) => {
    return(
        <Item>
            <StyledImage 
                source={{ uri: collection.image ? collection.image : 'https://cdn.shopify.com/s/files/1/0085/7427/1552/products/61PStgbt2EL._UY606_1024x1024@2x.jpg?v=1546079257' }} 
                resizeMode= 'cover'
                >
                <ItemContainer activeOpacity={0.8} onPress={onPressItem}>
                    <Title>{collection.title}</Title>
                </ItemContainer>
            </StyledImage>
        </Item>
    )
}

