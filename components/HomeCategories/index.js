import React from 'react';
import { StyledFlatList } from './style'
import HomeCategoriesItemContainer  from '../../containers/HomeCategoriesItem'
import { Separator } from '../Styled'

export const HomeCategories = ({ collectionIds }) => {
    return(
        <StyledFlatList
        showsHorizontalScrollIndicator={false}
        data={collectionIds}
        renderItem={({item, index}) => <HomeCategoriesItemContainer id={item} index={index}/> }
        keyExtractor={(item) => item}
        horizontal= {true}
        />
    )
}

