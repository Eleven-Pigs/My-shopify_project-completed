import React from 'react';
import { StyledView, StyledOpacity, StyledText, SortContainer, StyledModal} from './style'
import  { Icon } from 'expo'
import  FilterModal  from '../FilterModal'
import { theme } from '../../constants/Theme';

export default class FilterTab extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            sortTitle: 'Best Selling'
        }
    }
    openModal = () => {
        this.setState({visible: true})
    }
    cancelPressed = () => {
        this.setState({visible: false})
        
    }
    itemSelected = (sort) => {
        this.setState({visible: false, sortTitle: sort.title})
        this.props.sortPressed(sort)
    }

    render(){
        return(
        <StyledView>
            <FilterModal
                visible={this.state.visible}
                cancelPressed={this.cancelPressed}
                itemSelected={this.itemSelected}
            />
            <StyledOpacity onPress={this.openModal}>  
                <SortContainer>
                    <Icon.MaterialIcons
                        name='sort'
                        size={26}
                    />
                    <StyledText> Sort By :</StyledText>
                    <StyledText> {this.state.sortTitle}</StyledText>
                </SortContainer>
            </StyledOpacity>
          </StyledView>
        )
    }
}

