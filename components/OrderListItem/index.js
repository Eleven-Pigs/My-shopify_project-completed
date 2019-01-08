import React from 'react';
import { Item, Title } from './style'
import { Image, View, TouchableOpacity } from 'react-native'
const renderDefault = (isDefault, onDeletePress) => {
    if(isDefault){
        return(
            <View style ={{flex:1}}>
             <Title style={{fontWeight:'bold', fontSize: 15, color:'grey', textAlign: 'right'}}>Default</Title>
            </View>
        )
    }
    return(
        <TouchableOpacity onPress={onDeletePress} style = {{flex:1}}>
            <Title style = {{fontSize: 15, color:'grey', textAlign: 'right'}}>Set Default</Title>
        </TouchableOpacity>
    )
}
export const OrderListItem = ({ address, onPressItem, onDeletePress, isDefault }) => {
    return(
        <Item onPress={onPressItem} style = {{flexDirection: 'row', backgroundColor: 'white', marginTop: 5, padding: 5}}>
            <View style = {{padding: 10, flex:1,}}>
                <Title style = {{fontSize: 15}}>{address.address1}</Title>
                <Title style = {{fontSize: 15}}>{address.address2}</Title>
                <Title style = {{fontSize: 15}}>{address.zip}</Title>
                <Title style = {{fontSize: 15}}>{address.province}</Title>
                <View style ={{flexDirection: 'row'}}>
                    <Title style = {{fontSize: 15}}>{address.country}</Title>
                </View>

            </View>
        </Item>
    )
}

