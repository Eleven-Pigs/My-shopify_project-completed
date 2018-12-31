import React from 'react';
import { StyledView, StyledOpacity, StyledText, SortContainer, StyledModal} from './style'
import  Materialicons from '../Reusable/TabBarIcon/Materialicons'
import  FilterModal  from '../FilterModal'

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
    cancelPressed = (sortTitle) => {
        if (sortTitle){
            this.setState({sortTitle: sortTitle})
        }
        this.setState({visible: false})
    }

    render(){
        return(
        <StyledView>
            <FilterModal
                visible={this.state.visible}
                cancelPressed={this.cancelPressed}
            />
            <StyledOpacity onPress={this.openModal}>  
                <SortContainer>
                    <Materialicons focused={true} name='sort' />
                    <StyledText> Sort By :</StyledText>
                    <StyledText> {this.state.sortTitle}</StyledText>
                </SortContainer>
            </StyledOpacity>
          </StyledView>
        )
    }
}

