import React from 'react';
import { StyledFlatList } from './style'
import ProductItem  from '../../containers/ProductItem'


export const ProductList = ({ productIds, endReached }) => {
    return(
        <StyledFlatList
        data={productIds}
        renderItem={({item}) => <ProductItem id={item} /> }
        keyExtractor={(item) => item}
        numColumns= {2}
        onEndReached= {endReached}
        contentContainerStyle={{paddingBottom:60}}
        />
    )
}

