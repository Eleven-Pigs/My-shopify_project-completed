import { all } from 'redux-saga/effects';

import { userSaga } from './user'
import { productDetailSaga } from './productDetail'
import { cartSaga } from './cart'
import { startupSaga } from './startup'
import { collectionSaga } from './collection'
import { productListSaga } from './productList'
import { orderSaga } from './order'
import { orderDetailSaga } from './orderDetail'

function *watchAll() {
    yield all([...userSaga, ...productDetailSaga, ...cartSaga, ...startupSaga, ...collectionSaga, ...productListSaga, ...orderSaga, ...orderDetailSaga]);
}


export default watchAll;