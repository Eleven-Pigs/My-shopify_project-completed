import React from 'react';
import { Item, Title } from './style'
import { Image, View, TouchableOpacity } from 'react-native'

const formatDate = (date) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d = new Date(date);
    return `${months[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}`
}

export const OrderListItem = ({ order , onPressItem, moneyFormat}) => {
    return(
        <Item onPress={onPressItem} style = {{flexDirection: 'row', backgroundColor: 'white', marginTop: 5, padding: 5}}>
            <View style = {{padding: 10, flex:1,}}>
                <Title style = {{fontSize: 15}}>Order: {order.name}</Title>
                <Title style = {{fontSize: 15}}>Processed at: {formatDate(order.processedAt)}</Title>
                <Title style = {{fontSize: 15}}>Total: { moneyFormat.replace(/{{amount}}/, order.totalPrice) }</Title>
            </View>
        </Item>
    )
}

