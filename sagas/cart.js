import { CartTypes } from '../redux/cart'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createCheckout, addProductToCheckout, getCheckout } from '../api'
import { getId } from '../redux/cart'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"
import { getSelectedVariant, getSelectedCount } from '../redux/productDetail';

export function* fetchCartDetail() {
    const cartId = yield select(getId)
    const response =  yield call(getCheckout, cartId)
    const payload = yield response.json()
    if(response.ok){     
        if(payload.data.node.order === null ){
            yield put(CartActions.requestCartDetailSuccess(payload)) 
        }else{
            yield put(CartActions.requestCreateCheckout()) 
        }
    }else{
        yield put(CartActions.requestCartDetailFail())
    }
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

export function* requestAddProductToCheckout() {
    const variantId = yield select(getSelectedVariant)
    const variantCount = yield select(getSelectedCount)
    const cartId = yield select(getId) 
    const response = yield call(addProductToCheckout, variantId, variantCount, cartId)
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
    takeLatest(CartTypes.REQUEST_ADD_PRODUCT_TO_CHECKOUT, requestAddProductToCheckout),
    
]
