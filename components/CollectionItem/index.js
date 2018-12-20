import React from 'react';
import { Item, Title } from './style'

export const CollectionItem = ({ collection, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            <Title>{collection.handle}</Title>
            <Title>{collection.description}</Title>
        </Item>
    )
}

