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
    const isReady = sliderImages.length > 0 ? true: false
    return(
    <Main>
        <ProductDetailImagePlaceholder onReady={isReady} bgColor="grey" animate="fade">
            <Slideshow 
                dataSource={sliderImages}/>
        </ProductDetailImagePlaceholder>
    </Main>
    )
}

