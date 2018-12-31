import styled from 'styled-components';
import { View } from 'react-native'

export const StyledView = styled(View)`
   padding-left:20px;
   padding-right:20px;
   width: 100%;
   background-color: ${props => props.theme.background} 
`

