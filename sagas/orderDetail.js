import { takeLatest, call, select, put } from 'redux-saga/effects';
import { OrderDetailTypes } from '../redux/orderDetail'
import { getAccessToken } from '../redux/user'
import OrderDetailActions from '../redux/orderDetail'
import { getOrderDetail } from '../api'
import { getConfig } from '../redux/config'



export function* fetchOrderDetail(action) {
    const accessToken = yield select(getAccessToken)
    const config = yield select(getConfig)
    const id = action.id
    try {
        const response = yield call(getOrderDetail, config, id, accessToken)
        const payload = yield response.json()
        if (response.ok) {
            yield put(OrderDetailActions.requestUserOrderDetailSuccess(payload))

        } else {
            yield put(OrderDetailActions.requestUserOrderDetailFail())
        }
    } catch (e) {
        console.log(e)
        yield put(OrderDetailActions.requestUserOrderDetailFail())
    }
}


export const orderDetailSaga = [
    takeLatest(OrderDetailTypes.REQUEST_USER_ORDER_DETAIL, fetchOrderDetail)
]
