import { ProductListTypes, getCursor } from '../redux/productList'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProductFromCollection, getProductFromCollectionByHandle, getProductListBySearch } from '../api'
import ProductListActions from '../redux/productList'
import { getConfig } from '../redux/config'

export function* fetchProductListBySearch(action) {
    const { search, sortKey, reverse } = action
    const cursor = yield select(getCursor)
    const config = yield select(getConfig)
    try {
        const response = yield call(getProductListBySearch, config, search, cursor, sortKey, reverse)
        const payload = yield response.json()
        if (response.ok) {
            if (payload.data.products.edges.length > 0) {
                yield put(ProductListActions.requestProductListFromCollectionSuccess(payload.data))
            } else {
                yield put(ProductListActions.requestProductListFromCollectionSuccessEmpty())
            }
        } else {
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    } catch (e) {
        console.log('error', e, response)
    }
}

export function* fetchProductListFromCollection(action) {
    const { id, sortKey, reverse } = action
    const cursor = yield select(getCursor)
    const config = yield select(getConfig)
    try {
        const response = yield call(getProductFromCollection, config, id, cursor, sortKey, reverse)
        const payload = yield response.json()
        if (response.ok) {
            if (payload.data.node.products.edges.length > 0) {
                yield put(ProductListActions.requestProductListFromCollectionSuccess(payload.data.node))
            } else {
                yield put(ProductListActions.requestProductListFromCollectionSuccessEmpty())
            }
        } else {
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    } catch (e) {
        console.log('error', e)
    }
}
export function* fetchProductListFromCollectionByHandle(action) {
    const { handle, sortKey, reverse } = action
    const cursor = yield select(getCursor)
    const config = yield select(getConfig)
    try {
        const response = yield call(getProductFromCollectionByHandle, config, handle, cursor, sortKey, reverse)
        const payload = yield response.json()
        if (response.ok) {
            if (payload.data.collectionByHandle.products.edges.length > 0) {
                yield put(ProductListActions.requestProductListFromCollectionSuccess(payload.data.collectionByHandle))
            } else {
                yield put(ProductListActions.requestProductListFromCollectionSuccessEmpty())
            }

        } else {
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    } catch (e) {
        console.log('error', e)
    }
}



export const productListSaga = [
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_FROM_COLLECTION, fetchProductListFromCollection),
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_FROM_COLLECTION_BY_HANDLE, fetchProductListFromCollectionByHandle),
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_BY_SEARCH, fetchProductListBySearch),
]
