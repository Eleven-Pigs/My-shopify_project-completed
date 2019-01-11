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
            sortTitle: 'Best Selling',
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
    openModal = () => {
        this.setState({visible: true})
    }
    cancelPressed = () => {
        this.setState({visible: false})
        
    }
    getSelectedItem = () => {
       item = this.state.sorts.find(sort => sort.checked == true)
       return item.title
    }
    onPress = (selectedSort) => {
        const newSortState = this.state.sorts.map(sort => {
            return {
                title: sort.title,
                checked: selectedSort.value == sort.value ? true : false,
                value: sort.value
            }
        })
        this.setState({sorts: newSortState})
        this.props.sortPressed(selectedSort)
        this.cancelPressed()
    }

    render(){
        return(
        <StyledView>
            <FilterModal
                visible={this.state.visible}
                cancelPressed={this.cancelPressed}
                itemSelected={this.itemSelected}
                primaryColor = {this.props.primaryColor}
                sorts = {this.state.sorts}
                onPress = {this.onPress}
            />
            <StyledOpacity onPress={this.openModal}>  
                <SortContainer>
                    <Icon.MaterialIcons
                        name='sort'
                        size={26}
                    />
                    <StyledText> Sort By :</StyledText>
                    <StyledText> {this.getSelectedItem()}</StyledText>
                </SortContainer>
            </StyledOpacity>
          </StyledView>
        )
    }
}

