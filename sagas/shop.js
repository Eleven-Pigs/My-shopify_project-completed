import { ShopTypes } from '../redux/shop'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getShopDetail } from '../api'
import ShopActions from '../redux/shop'

export function* fetchShopDetail() {
    try{
        const response =  yield call(getShopDetail)
        const payload = yield response.json()
        if(response.ok){ 
            yield put(ShopActions.requestShopDetailSuccess(payload.data))  
        }else{
            yield put(ShopActions.requestShopDetailFail())
        }
    }catch(e){
        yield put(ShopActions.requestShopDetailFail())
        console.log('error',e)
    }
}


export const shopSaga = [
    takeLatest(ShopTypes.REQUEST_SHOP_DETAIL, fetchShopDetail),
]
