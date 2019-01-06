import React from 'react';
import { StyledFlatList } from './style'
import CartItemContainer  from '../../containers/CartItem'
import { Separator } from '../Styled'

export class CartList extends React.Component {
    constructor(props){
        super(props)
    }
    _onRefresh = () => {
        this.props.onRefresh()
    }
    render(){
        return(
            <StyledFlatList
            data={this.props.productIds}
            renderItem={({item}) => <CartItemContainer id={item}/> }
            keyExtractor={(item) => item}
            refreshing={this.props.isFetching}
            onRefresh={this._onRefresh}
            />
        )
    }
}

