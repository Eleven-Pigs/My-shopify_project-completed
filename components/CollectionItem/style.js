import styled from 'styled-components';
import { Text, TouchableOpacity } from 'react-native'

export const Title = styled(Text)`
    font-size: 18px;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 10px;
`
export const Description = styled(Text)`
    margin-top: 5px;
`
export const Item = styled(TouchableOpacity)`
    padding: 5px;
    width: 50%;
`
export const ItemContainer = styled(TouchableOpacity)`
    border-radius:5px;
    width: 100%;
    height: 90px;
`


