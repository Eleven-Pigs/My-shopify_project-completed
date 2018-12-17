import { all } from 'redux-saga/effects';

import { userSaga } from './user'
import { productDetailSaga } from './productDetail'
import { cartSaga } from './cart'
import { startupSaga } from './startup'
function *watchAll() {
    yield all([...userSaga, ...productDetailSaga, ...cartSaga, ...startupSaga]);
}


export default watchAll;