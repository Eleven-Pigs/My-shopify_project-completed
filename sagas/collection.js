import { CollectionTypes } from '../redux/collection'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getCollections } from '../api'
import CollectionActions from '../redux/collection'
import { getConfig } from '../redux/config'
import { ConfigTypes } from '../redux/config'

export function* fetchCollections() {
    const config = yield select(getConfig)
    try {
        const response = yield call(getCollections, config)
        const payload = yield response.json()
        if (response.ok) {
            yield put(CollectionActions.requestCollectionListSuccess(payload))
        } else {
            yield put(CartActions.requestCollectionListFail())
        }
    } catch (e) {
        console.log('error', e)
    }
}
export function* clearCollections() {
    yield put(CollectionActions.clearCollections())
    yield put(CollectionActions.requestCollectionList())
}


export const collectionSaga = [
    takeLatest(CollectionTypes.REQUEST_COLLECTION_LIST, fetchCollections),
    takeLatest(ConfigTypes.SET_SHOPIFY_STORE, clearCollections),
]
