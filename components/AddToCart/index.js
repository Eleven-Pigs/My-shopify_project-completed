import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'

export const AddToCart = ({ addToCart, price }) => {
    return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton onPress={() => addToCart()}>
                <TextButton>Add to cart</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

