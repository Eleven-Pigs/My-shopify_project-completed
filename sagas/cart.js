import { CartTypes } from '../redux/cart'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createCheckout, addProductToCheckout, getCheckout, addAddresstoCheckout, addEmailToCheckout } from '../api'
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
        yield put(CartActions.requestCartDetail())
    }else{
        yield put(CartActions.requestCreateCheckoutFail())
    }
}
export function* requestAddEmailAddress(action) {
    const {email, address} = action
    const cartId = yield select(getId) 
    try{
        const addressResponse = yield call(addAddresstoCheckout, address, cartId)
        const emailResponse = yield call(addEmailToCheckout, email, cartId)
        const addressPayload = yield addressResponse.json()
        const emailPayload = yield emailResponse.json()
        if(addressResponse.ok && emailResponse.ok){
            console.log('addresspayload', addressPayload)
            console.log('emailpayload', emailPayload)
            yield put(CartActions.requestAddEmailAddressSuccess()) 
        }else{
            yield put(CartActions.requestCreateCheckoutFail())
        }
    }catch(e){
        console.log(e)
    }
}


export const cartSaga = [
    takeLatest(CartTypes.REQUEST_CART_DETAIL, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT, requestCreateCheckout),
    takeLatest(CartTypes.REQUEST_ADD_PRODUCT_TO_CHECKOUT, requestAddProductToCheckout),
    takeLatest(CartTypes.REQUEST_ADD_EMAIL_ADDRESS, requestAddEmailAddress),
]
