import React from 'react';
import { Item, Title, ItemContainer, StyledImage } from './style'

export const CollectionItem = ({ collection, onPressItem, index }) => {
    return(
        <Item>
            {collection.image && <StyledImage 
                source={{ uri: collection.image }} 
                resizeMode= 'cover'
                >
                <ItemContainer onPress={onPressItem} activeOpacity={0.8}>
                    <Title>{collection.title}</Title>
                </ItemContainer>
            </StyledImage>}
        </Item>
    )
}

