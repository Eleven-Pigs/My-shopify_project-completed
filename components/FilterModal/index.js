import React from 'react';
import { StyledText, StyledModal, StyledView, ModalContainer, ModalHeader, StyledOpacity, ModalContent, StyledScrollView, FilterText, FilterTouchableContainer} from './style'
import { Icon } from 'expo'
import { theme } from '../../constants/Theme'
export default class FilterModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sorts: [
                {
                    title: 'Best Selling',
                    checked: true,
                    value: 2,
                },
                {
                    title: 'Alphabetically, A - Z ',
                    checked: false,
                    value: 3,
                },
                {
                    title: 'Alphabetically, Z - A ',
                    checked: false,
                    value: 4,
                },
                {
                    title: 'Price, low to high',
                    checked: false,
                    value: 5,
                },
                {
                    title: 'Price, high to low',
                    checked: false,
                    value: 6,
                },
                {
                    title: 'Date, new to old',
                    checked: false,
                    value: 7,
                },
                {
                    title: 'Date, old to new',
                    checked: false,
                    value: 8,
                },
            ]
        }
    }

    renderCheck = () => {
        return (
            <Icon.Feather
                name='check'
                size={26}
                color={this.props.primaryColor}
                style = {{flex: 1, textAlign: 'right', paddingRight: 10,}}
            />
        )
    }

    onPress = (value) => {
        const newSortState = this.state.sorts.map(sort => {
            return {
                title: sort.title,
                checked: value == sort.value ? true : false,
                value: sort.value
            }
        })
        const selectedSort = this.state.sorts.find( sort => sort.value == value)
        this.setState({sorts: newSortState})
        this.props.itemSelected(selectedSort)
    }

    renderSort = (sorts) => {
        return sorts.map(sort => {
            return (
                <FilterTouchableContainer key ={sort.value} onPress={() => this.onPress(sort.value)}>
                    <FilterText>{sort.title}</FilterText>
                    { sort.checked && this.renderCheck() }

                </FilterTouchableContainer>
                
            )
        })
    }

    render (){
        return(
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
           
          }}>
            <StyledView>
                    <ModalContainer>
                        <ModalHeader style = {{backgroundColor: this.props.primaryColor}}>
                            <StyledOpacity onPress= {this.props.cancelPressed}>
                                <Icon.Entypo
                                    name='cross'
                                    size={26}
                                    color='white'
                                />
                            </StyledOpacity>
                            <StyledText>Sort By</StyledText>
                        </ModalHeader>
                        <ModalContent>
                            <StyledScrollView contentContainerStyle={{paddingBottom:80}}>
                                {this.renderSort(this.state.sorts)} 
                            </StyledScrollView>
                        </ModalContent>
                    </ModalContainer>
            </StyledView>
        </StyledModal>
        )
    }
}


