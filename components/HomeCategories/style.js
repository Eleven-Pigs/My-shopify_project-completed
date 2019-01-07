import styled from 'styled-components';
import { FlatList } from 'react-native'

export const StyledFlatList = styled(FlatList)`
    background-color: ${props => props.theme.listBackground};
`


