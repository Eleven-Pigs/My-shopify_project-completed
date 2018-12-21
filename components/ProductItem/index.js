import React from 'react';
import { Item, Title } from './style'

export const ProductItem = ({ product, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            <Title>{product.title}</Title>
        </Item>
    )
}

