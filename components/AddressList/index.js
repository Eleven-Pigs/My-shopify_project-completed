import React from 'react';
import { StyledFlatList } from './style'
import AddressListItemContainer  from '../../containers/AddressListItem'


export class AddressList extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <StyledFlatList
            data={this.props.addressIds}
            renderItem={({item}) => <AddressListItemContainer id={item}/> }
            keyExtractor={(item) => item}
            refreshing={this.props.isFetching}
            />
        )
    }
}

