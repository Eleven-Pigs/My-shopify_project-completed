import React from 'react';
import { Item, Title } from './style'
import { Image, View, TouchableOpacity } from 'react-native'

export const OrderListItem = ({ order , onPressItem}) => {
    return(
        <Item onPress={onPressItem} style = {{flexDirection: 'row', backgroundColor: 'white', marginTop: 5, padding: 5}}>
            <View style = {{padding: 10, flex:1,}}>
                <Title style = {{fontSize: 15}}>{order.name}</Title>
                <Title style = {{fontSize: 15}}>{order.processedAt}</Title>
            </View>
        </Item>
    )
}

