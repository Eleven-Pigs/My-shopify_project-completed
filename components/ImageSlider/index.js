import React from 'react';
import { Main, Center } from '../Styled'
import Slideshow from 'react-native-slideshow';
import ProductDetailImagePlaceholder from '../Placeholder/ProductDetailPlaceholder';

export const ImageSlider = ({ images }) => {
    const sliderImages = images.map(image => {
        return {
            url: image
        }
    })
    return(
    <Main>
        <Slideshow 
            dataSource={sliderImages}/>
    </Main>
    )
}

