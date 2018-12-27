import styled from 'styled-components';
import { FlatList } from 'react-native'

export const StyledFlatList = styled(FlatList)`
    height: 100%;
    background-color: ${props => props.theme.listBackground};
`


