import { ProductListTypes, getCursor } from '../redux/productList'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProductFromCollection, getProductFromCollectionByHandle } from '../api'
import ProductListActions from '../redux/productList'

export function* fetchProductListFromCollection(action) {
    const { id } = action 
    const cursor = yield select(getCursor)
    try{
        const response =  yield call(getProductFromCollection, id, cursor)
        const payload = yield response.json()
        if(response.ok){ 
            if(payload.data.node.products.edges.length > 0){
                yield put(ProductListActions.requestProductListFromCollectionSuccess(payload.data.node))  
            }else{
                yield put(ProductListActions.requestProductListFromCollectionSuccessEmpty(payload.data.node))
            }
        }else{
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    }catch(e){
        console.log('error',e)
    }
}
export function* fetchProductListFromCollectionByHandle(action) {
    const { handle } = action
    const cursor = yield select(getCursor) 
    try{
        const response =  yield call(getProductFromCollectionByHandle, handle, cursor)
        const payload = yield response.json()
        if(response.ok){     
            yield put(ProductListActions.requestProductListFromCollectionSuccess(payload.data.collectionByHandle))   
        }else{
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    }catch(e){
        console.log('error',e)
    }
}



export const productListSaga = [
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_FROM_COLLECTION, fetchProductListFromCollection),
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_FROM_COLLECTION_BY_HANDLE, fetchProductListFromCollectionByHandle),
]
