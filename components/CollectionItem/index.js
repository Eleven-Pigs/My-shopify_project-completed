import React from 'react';
import { Item, Title, Description } from './style'

export const CollectionItem = ({ collection, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            <Title>{collection.title}</Title>
        </Item>
    )
}

