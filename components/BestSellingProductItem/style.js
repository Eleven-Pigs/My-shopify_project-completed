import styled from 'styled-components';
import { Text, TouchableOpacity, Image, View } from 'react-native'

export const Title = styled(Text)`
    height: 35px;
`
export const Price = styled(Text)`
    margin-top:5px;
    fontWeight: bold;
`

export const Item = styled(TouchableOpacity)`
    padding:1px;
    background-color: ${props => props.theme.listBackground};
    margin-top:1px;
    height: 200px;
    width: 200px;
`

export const StyledImage = styled(Image)`
    height: 200px;
    background-color: white;
    resizeMode: contain;
`
export const DescriptionContainer = styled(View)`
    background-color: white;
    padding: 10px;
`