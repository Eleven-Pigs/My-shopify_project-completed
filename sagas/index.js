import { all } from 'redux-saga/effects';

import { userSaga } from './user'
import { productDetailSaga } from './productDetail'
function *watchAll() {
    yield all([...userSaga, ...productDetailSaga]);
}


export default watchAll;