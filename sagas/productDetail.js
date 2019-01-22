import { ProductDetailTypes } from '../redux/productDetail'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProduct, getProductByHandle } from '../api'
import ProductDetailAction from '../redux/productDetail'
import { getConfig } from '../redux/config'
import {Alert} from 'react-native'
export function* fetchProductDetail(action) {
    const { id } = action
    const config = yield select(getConfig)
    const response = yield call(getProduct, config, id)
    const payload = yield response.json()
    if (response.ok) {
        yield put(ProductDetailAction.requestProductDetailSuccess(payload.data.node))
    } else {
        yield put(ProductDetailAction.requestProductDetailFailed())
    }
}


export function* fetchProductDetailByHandle(action) {
    const { handle } = action
    const config = yield select(getConfig)
    const response = yield call(getProductByHandle, config, handle)
    const payload = yield response.json()
    if (response.ok) {
        if(payload.data.productByHandle){
            yield put(ProductDetailAction.requestProductDetailSuccess(payload.data.productByHandle))
        }else{
            Alert.alert(
                'Product does not exists.',
                'The owner have not make this product available on the app.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            yield put(ProductDetailAction.requestProductDetailFailed())
        }
    } else {
        yield put(ProductDetailAction.requestProductDetailFailed())
    }
}
export const productDetailSaga = [
    takeLatest(ProductDetailTypes.REQUEST_PRODUCT_DETAIL, fetchProductDetail),
    takeLatest(ProductDetailTypes.REQUEST_PRODUCT_DETAIL_BY_HANDLE, fetchProductDetailByHandle)

]
