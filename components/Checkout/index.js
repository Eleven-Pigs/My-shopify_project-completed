import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'

export const Checkout = ({ onPress, price }) => {
    return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton onPress={onPress}>
                <TextButton>Checkout</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

