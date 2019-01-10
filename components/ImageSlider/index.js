import React from 'react';
import { theme } from '../../constants/Theme'
import { StyledImage, StyledView } from './style'
import { Text } from 'react-native'
import Swiper from 'react-native-swiper';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
const renderImage = (images) => {

    return (
        images.map((image, index) => {
            return (
                <StyledView key={index} >
                    <StyledImage
                            source={{uri: image}}
                            resizeMode={ImageResizeMode.contain}
                    />
                </StyledView>
            )
        })
    )
}

export const ImageSlider = ({ images, primaryColor }) => {
    return(
        <Swiper 
            activeDotColor={primaryColor} 
            style = {{backgroundColor: 'white'}} 
            loop={false} 
            showsButtons={images.length > 1 ? true : false}
            nextButton={<Text style = {{    fontSize: 50,
                color: primaryColor}}>›</Text>}
            prevButton={<Text style = {{    fontSize: 50,
                color: primaryColor}}>‹</Text>}
            >
            {renderImage(images)}
        </Swiper>
            
    )
}

