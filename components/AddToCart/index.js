import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'
import { theme } from '../../constants/Theme';

export const AddToCart = ({ isError, addToCart, price, isAvailableForSale, isAddingProduct, buttonBackgroundColor, buttonTextColor }) => {
  return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton disabled={!isAvailableForSale || isAddingProduct || isError} style = {{backgroundColor: isAvailableForSale && !isAddingProduct && !isError ? buttonBackgroundColor : 'lightgrey'}}onPress={() => addToCart()}>
                <TextButton style = {{color: buttonTextColor}}>{isAvailableForSale ? 'Add to cart' : 'Sold Out'}</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

