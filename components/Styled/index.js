import styled from 'styled-components';
import { View, SafeAreaView } from 'react-native'

export const Main = styled(View)`
    flex: 1;
    background-color: ${props => props.theme.background}
`;

export const Center = styled(View)`
    flex:1;
    align-items: center;
    justify-content: center;
`
export const Separator = styled(View)`
    height: 1;
    background-color: #CED0CE
`
export const StyledSafeAreaView = styled(SafeAreaView)`
    background-color: ${props => props.theme.background}
`