import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native'

export const  TextPrice= styled(Text)`
    margin-top: 20px;
    flex:1;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    flex: 4
`

export const  TextButton= styled(Text)`
    color: white;
    font-size: 20px;
    text-align: center;

`
export const  TextTotal= styled(Text)`
    margin-top: 10px;
    flex:1;
    text-align: right;

`
export const MainView = styled(View)`
    height: 80px;
    border-color: lightgrey;
    border-top-width: 1;
    background-color: white;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    flexDirection: row;
    flex:1
`

export const ButtonView = styled(View)`
    flex: 4;
    padding: 4px;
`

export const AddToCartButton = styled(TouchableOpacity)`
    margin-top: 10px;
    padding: 5px;

`
