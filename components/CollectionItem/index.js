import React from 'react';
import { Item, Title, Description } from './style'

export const CollectionItem = ({ collection, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            <Title>{collection.handle}</Title>
            <Description>{collection.description}</Description>
        </Item>
    )
}

