import React from 'react';
import { StyledFlatList } from './style'
import ProductItem  from '../../containers/ProductItem'
import { Separator } from '../Styled'

export const ProductList = ({ productIds }) => {
    return(
        <StyledFlatList
        data={productIds}
        renderItem={({item}) => <ProductItem id={item} /> }
        keyExtractor={(item) => item}
        ItemSeparatorComponent={ Separator }
        />
    )
}

