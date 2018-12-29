import React from 'react';
import { StyledFlatList } from './style'
import CollectionItemContainer  from '../../containers/CollectionItem'
import { Separator } from '../Styled'

export const CollectionList = ({ collectionIds }) => {
    return(
        <StyledFlatList
        data={collectionIds}
        renderItem={({item, index}) => <CollectionItemContainer id={item} index={index}/> }
        keyExtractor={(item) => item}
        numColumns= {2}
        />
    )
}

