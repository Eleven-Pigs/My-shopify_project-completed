import { ShopTypes } from '../redux/shop'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getMoneyFormat } from '../api'
import ShopActions from '../redux/shop'

export function* fetchMoneyFormat() {
    try{
        const response =  yield call(getMoneyFormat)
        const payload = yield response.json()
        if(response.ok){ 
            yield put(ShopActions.requestMoneyFormatSuccess(payload.data))  
        }else{
            yield put(ShopActions.requestMoneyFormatFail())
        }
    }catch(e){
        yield put(ShopActions.requestMoneyFormatFail())
        console.log('error',e)
    }
}


export const shopSaga = [
    takeLatest(ShopTypes.REQUEST_MONEY_FORMAT, fetchMoneyFormat),
]
