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
                <StyledTouchableOpacity onPress = {this.props.onItemPress} style = {{borderColor: this.props.isSelected ? theme.background : 'grey'}}>
                    <StyledText>{this.props.variant.title}</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        )
    }
}


