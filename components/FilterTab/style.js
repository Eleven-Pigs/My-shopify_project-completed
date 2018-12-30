import styled from 'styled-components';
import { View, TouchableOpacity} from 'react-native'

export const StyledView = styled(View)`
    height: 35px;
    flex: 1;
    flex-direction: row;
    border-color: ${props => props.theme.listBackground};
    border-top-width: 1px;
    background-color: white;
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;

`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-top: 10px;
    flex:1;
    align-items: center;
`