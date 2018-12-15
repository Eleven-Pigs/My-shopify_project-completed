import React from 'react';
import { Main, Center } from '../Styled'
import Slideshow from 'react-native-slideshow';

export const ImageSlider = ({ images }) => {
    return(
    <Main>
        <Center>
        <Slideshow 
            dataSource={images}/>
        </Center>
    </Main>
    )
}

