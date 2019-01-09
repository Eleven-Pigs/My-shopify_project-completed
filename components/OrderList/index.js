import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native'
import { StyledFlatList } from './style'
import OrderListItemContainer  from '../../containers/OrderListItem'


export class OrderList extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <StyledFlatList
            data={this.props.orderIds}
            renderItem={({item}) => <OrderListItemContainer id={item}/> }
            keyExtractor={(item) => item}
            refreshing={this.props.isFetching}
            onEndReached= {this.props.onEndReached}
            />
        )
    }
}

