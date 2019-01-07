import React from 'react';
import { StyledFlatList } from './style'
import BestSellingProductItem  from '../../containers/BestSellingProductItem'
import { Text, View } from 'react-native'

export const BestSellingProducts = ({ productIds, endReached }) => {
    return(
        <StyledFlatList
        style={{height: 300, marginTop: 20}}
        data={productIds}
        renderItem={({item}) => <BestSellingProductItem id={item} /> }
        keyExtractor={(item) => item}
        horizontal={true}
        ListHeaderComponent={<View style = {{paddingLeft:10, paddingRight:20,height:'100%',alignItems: 'center', justifyContent: 'center'}}><Text style = {{width: 200, fontSize: 20, textAlign: 'center'}}>Best Seller</Text></View>}
        showsHorizontalScrollIndicator={false}
        />
    )
}

