import React from 'react';
import { Item, Title, ItemContainer } from './style'
import Colors  from '../../constants/Colors'


getColor = (index) => {
    return Colors.materialColor[index];
}

export const CollectionItem = ({ collection, onPressItem, index }) => {
    return(
        <Item>
            <ItemContainer onPress={onPressItem} style = {{backgroundColor: this.getColor(index)}}>
                <Title>{collection.title}</Title>
            </ItemContainer>
        </Item>
    )
}

