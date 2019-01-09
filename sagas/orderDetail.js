import { takeLatest, call, select, put } from 'redux-saga/effects';
import { OrderDetailTypes } from '../redux/orderDetail'
import { getAccessToken } from '../redux/user'
import OrderActions from '../redux/order'
import { getOrderDetail } from '../api'
import { getConfig } from '../redux/config'



export function* fetchOrderDetail(action) {
    const accessToken = yield select(getAccessToken)
    const config = yield select(getConfig)
    const id = action.id
    try {
        const response = yield call(getOrderDetail, config, id, accessToken)
        const payload = yield response.json()
        console.log('sadfasdfasdf', response)
        if (response.ok) {
            if (payload.data.customer.orders.edges.length > 0) {
                yield put(OrderActions.requestUserOrderDetailSuccess(payload.data))
            } else {
                yield put(OrderActions.requestUserOrderDetailFail())
            }
        } else {
            yield put(OrderActions.requestUserOrderDetailFail())
        }
    } catch (e) {
        console.log(e)
        yield put(OrderActions.requestUserOrderDetailFail())
    }
}


export const orderDetailSaga = [
    takeLatest(OrderDetailTypes.REQUEST_USER_ORDER_DETAIL, fetchOrderDetail)
]
