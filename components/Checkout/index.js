import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'
import { theme } from '../../constants/Theme'

export const Checkout = ({ onPress, price, cartItemCount, primaryColor }) => {
    return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton style = {{backgroundColor: cartItemCount === 0 ? 'lightgrey' : primaryColor }} disabled={cartItemCount === 0 ? true : false} onPress={onPress}>
                <TextButton>Checkout</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

