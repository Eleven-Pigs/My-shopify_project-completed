import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'
import { theme } from '../../constants/Theme';

export const AddToCart = ({ addToCart, price, isAvailableForSale, isAddingProduct, primaryColor }) => {
    return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton disabled={!isAvailableForSale || isAddingProduct} style = {{backgroundColor: isAvailableForSale ? primaryColor : 'lightgrey'}}onPress={() => addToCart()}>
                <TextButton>{isAvailableForSale ? 'Add to cart' : 'Sold Out'}</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

