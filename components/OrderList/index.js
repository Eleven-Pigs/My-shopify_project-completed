import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native'
import { StyledFlatList } from './style'
import OrderListItemContainer  from '../../containers/OrderListItem'


export class OrderList extends React.Component {
    constructor(props){
        super(props)
    }
    renderFooter = () => {
        return (
            <View style ={{alignItems: 'center', marginTop: 20, marginBottom: 30}}>
                <TouchableOpacity onPress={this.props.addNewAddressPressed} style = {{width: 200,backgroundColor: this.props.buttonBackgroundColor, padding: 20 }}>
                    <Text style={{color: this.props.buttonTextColor, fontSize: 18, textAlign: 'center'}}>Add new address</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return(
            <StyledFlatList
            data={this.props.addressIds}
            renderItem={({item}) => <OrderListItemContainer id={item}/> }
            keyExtractor={(item) => item}
            refreshing={this.props.isFetching}
            ListFooterComponent={this.renderFooter()}
            />
        )
    }
}

