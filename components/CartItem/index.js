import React from 'react';
import { Item, Title } from './style'

export const CartItem = ({ product, onPressItem }) => {
    return(
        <Item onPress={onPressItem}>
            <Title>{product.title} {product.quantity}</Title>
        </Item>
    )
}

