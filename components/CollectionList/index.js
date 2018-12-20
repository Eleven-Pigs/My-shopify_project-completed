import React from 'react';
import { StyledFlatList } from './style'
import CollectionItemContainer  from '../../containers/CollectionItem'
import { Separator } from '../Styled'

export const CollectionList = ({ collectionIds, onPressItem }) => {
    return(
        <StyledFlatList
        data={collectionIds}
        renderItem={({item}) => <CollectionItemContainer id={item} onPressItem= {onPressItem}/> }
        keyExtractor={(item) => item}
        ItemSeparatorComponent={ Separator }
        />
    )
}

