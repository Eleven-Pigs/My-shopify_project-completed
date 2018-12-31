import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal} from 'react-native'


export const StyledView = styled(View)`
    flex: 1;
    justify-content: flex-end;
`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-left: 5
    padding-right: 5
`
export const StyledText = styled(Text)`
    flex: 1;
    padding-right: 40px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
`

export const SortContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const StyledModal = styled(Modal)`
    height: 50%;
`
export const ModalContainer = styled(View)`
    width: 100%;
    height: 40%;
    background-color: white;
    border-color: ${props => props.theme.listBackground};
    border-top-width: 1px;
    border-radius: 5px;
`

export const ModalHeader = styled(View)`
    background-color: ${props => props.theme.background};
    border-color: ${props => props.theme.listBackground};
    border-top-width: 1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`