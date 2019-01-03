import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal, FlatList, Image} from 'react-native'


export const StyledImage = styled(Image)`
    height: 100px;
    width: 100px;
    top: -50
    border-radius: 5px;
    border-color: ${props => props.theme.listBackground};
    background-color: white;
    border-width:1px;
    
`
export const HeaderView = styled(View)`
    flex: 1;
    padding-left: 10px;
    
`
export const StyledView = styled(View)`
    flex: 1;
    justify-content: flex-end;
`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-left: 5
    padding-right: 5
`
export const StyledText = styled(Text)`
    font-size: 15px;
`
export const StyledQty = styled(Text)`
    font-size: 15px;
`

export const FilterText = styled(Text)`
    font-size: 18
`   
export const FilterTouchableContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 10px;
`  

export const SortContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const StyledModal = styled(Modal)`
    height: 100%;
    background-color: ${props => props.theme.listBackground};
`
export const ModalContainer = styled(View)`
    width: 100%;
    height: 60%;
    border-radius: 5px;
`

export const ModalHeader = styled(View)`
    background-color: ${props => props.theme.listBackground};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px;
    flex-direction: row;
`
export const ModalContent= styled(View)`
    background-color: ${props => props.theme.listBackground};
    height: 100%;
    top: -20;
`

export const StyledFlatList = styled(FlatList)`
    padding-top: 10px;
`
