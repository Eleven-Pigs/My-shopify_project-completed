import { takeLatest, call, select, put } from 'redux-saga/effects';
import { OrderTypes } from '../redux/order'
import { getAccessToken } from '../redux/user'
import OrderActions from '../redux/order'
import { getOrderList } from '../api'



export function* fetchOrderList() {
    const accessToken = yield select(getAccessToken)
    try{
        const response =  yield call(getOrderList, accessToken)
        const payload = yield response.json()
        if(response.ok){ 
            if(payload.data.customer.orders.edges.length > 0){
                yield put(OrderActions.requestUserOrdersSuccess(payload.data))  
            }else{
                yield put(OrderActions.requestUserOrdersFail())
            }
        }else{
            yield put(OrderActions.requestUserOrdersFail())
        }
    }catch(e){
        yield put(OrderActions.requestUserOrdersFail())
    }
}


export const orderSaga = [
    takeLatest(OrderTypes.REQUEST_USER_ORDERS, fetchOrderList)
]
