import { ProductDetailTypes } from '../redux/productDetail'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProduct, getProductByHandle } from '../api'
import ProductDetailAction from '../redux/productDetail'
import {getConfig} from '../redux/config'

export function* fetchProductDetail(action) {
    const { id } = action 
    const config = select(getConfig)
    const response =  yield call(getProduct, config, id)
    const payload = yield response.json()
    if(response.ok){      
        yield put(ProductDetailAction.requestProductDetailSuccess(payload.data.node))
    }else{
        yield put(ProductDetailAction.requestProductDetailFailed())
    }
}


export function* fetchProductDetailByHandle(action) {
    const { handle } = action 
    const config = select(getConfig)
    const response =  yield call(getProductByHandle, config, handle)
    const payload = yield response.json()
    if(response.ok){      
        yield put(ProductDetailAction.requestProductDetailSuccess(payload.data.productByHandle))
    }else{
        yield put(ProductDetailAction.requestProductDetailFailed())
    }
}
export const productDetailSaga = [
    takeLatest(ProductDetailTypes.REQUEST_PRODUCT_DETAIL, fetchProductDetail),
    takeLatest(ProductDetailTypes.REQUEST_PRODUCT_DETAIL_BY_HANDLE, fetchProductDetailByHandle)
    
]
