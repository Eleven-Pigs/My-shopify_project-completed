import { CartTypes } from '../redux/cart'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createCheckout } from '../api'
import { getId } from '../redux/cart'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"

export function* fetchCartDetail() {
    const cartId = yield select(getId) 
    console.log(cartId)
}

export function* requestCreateCheckout() {
    
    const response =  yield call(createCheckout)
    const payload = yield response.json()
    if(response.ok){
        //save shopify cart id
        
        yield put.resolve(CartActions.requestCreateCheckoutSuccess(payload))
        const cartId = yield select(getId)
        yield call([AsyncStorage, 'setItem'], 'cartId', cartId)    
    }else{
        yield put(CartActions.requestCreateCheckoutFail(payload))
    }
}
export function* getAsyncStorageCheckoutId() {
    const id = yield call([AsyncStorage, 'getItem'], 'cartId')
    yield put(CartActions.setCartId(id))
    
}
export const cartSaga = [
    takeLatest(CartTypes.REQUEST_CART_DETAIL, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT, requestCreateCheckout),
    takeLatest(CartTypes.GET_ASYNC_STORAGE_CHECKOUT_ID, getAsyncStorageCheckoutId)
]
