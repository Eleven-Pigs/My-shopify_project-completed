import React from 'react';
import { StyledFlatList } from './style'
import CartItemContainer  from '../../containers/CartItem'
import { Separator } from '../Styled'

export const CartList = ({ productIds }) => {
    return(
        <StyledFlatList
        data={productIds}
        renderItem={({item}) => <CartItemContainer id={item}/> }
        keyExtractor={(item) => item}
        ItemSeparatorComponent={ Separator }
        />
    )
}

