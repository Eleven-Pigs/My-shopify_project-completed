import styled from 'styled-components';
import { Text, TouchableOpacity, ImageBackground } from 'react-native'

export const Title = styled(Text)`
    font-size: 20px;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    
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
    height: 200px;
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
    
`
export const StyledImage = styled(ImageBackground)`
    height: 200px;
    width: 100%;
`


