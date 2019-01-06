import React from 'react';
import { StyledText, StyledView, StyledTouchableOpacity} from './style'
import { Icon } from 'expo'
import { theme } from '../../constants/Theme'
export default class VariantModalItem extends React.Component {
    constructor(props){
        super(props)
    }

    render (){
        return(
            <StyledView>
                <StyledTouchableOpacity disabled = {!this.props.variant.availableForSale} onPress = {this.props.onItemPress} style = {{borderColor: this.props.isSelected ? theme.background : 'grey'}}>
                    <StyledText style = {{ textDecorationLine: this.props.variant.availableForSale ? "" : "line-through", color: this.props.variant.availableForSale ? 'black' : 'grey'}}>{this.props.variant.title}</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        )
    }
}


