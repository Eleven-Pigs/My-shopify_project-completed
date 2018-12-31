import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal} from 'react-native'

export const StyledView = styled(View)`
    height: 35px;
    border-color: ${props => props.theme.listBackground};
    border-top-width: 1px;
    background-color: white;
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;

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