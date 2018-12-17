import { CartTypes } from '../redux/cart'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createCheckout, addProductToCheckout } from '../api'
import { getId } from '../redux/cart'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"

export function* fetchCartDetail() {
    const cartId = yield select(getId) 
    console.log('id = ',cartId)
}

export function* requestCreateCheckout() {
    
    const response =  yield call(createCheckout)
    const payload = yield response.json()
    if(response.ok){     
        yield put.resolve(CartActions.requestCreateCheckoutSuccess(payload))
        const cartId = yield select(getId)
        yield call([AsyncStorage, 'setItem'], 'cartId', cartId)    
    }else{
        yield put(CartActions.requestCreateCheckoutFail(payload))
    }
}

export function* requestAddProductToCheckout(action) {
    const product = action.product
    const cartId = yield select(getId) 
    const response = yield call(addProductToCheckout, product, cartId)
    const payload = yield response.json()
    if(response.ok){
        yield put(CartActions.requestAddProductToCheckoutSuccess(payload)) 
    }else{
        yield put(CartActions.requestCreateCheckoutFail())
    }
}



export const cartSaga = [
    takeLatest(CartTypes.REQUEST_CART_DETAIL, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT, requestCreateCheckout),
    takeLatest(CartTypes.SET_CART_ID, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT_SUCCESS, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_ADD_PRODUCT_TO_CHECKOUT, requestAddProductToCheckout),
    
]
