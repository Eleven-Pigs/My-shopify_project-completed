import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal} from 'react-native'


export const StyledView = styled(View)`
    flex: 1;
    justify-content: flex-end;

`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-top: 10px;
    align-items: center;
`
export const StyledText = styled(Text)`

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