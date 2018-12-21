import { ProductListTypes } from '../redux/productList'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProductFromCollection } from '../api'
import ProductListActions from '../redux/productList'

export function* fetchProductListFromCollection(action) {
    const { id, cursor } = action 
    try{
        const response =  yield call(getProductFromCollection, id, cursor)
        const payload = yield response.json()
        if(response.ok){     
            yield put(ProductListActions.requestProductListFromCollectionSuccess(payload))   
        }else{
            yield put(CartActions.requestProductListFromCollectionFail())
        }
    }catch(e){
        console.log('error',e)
    }
}




export const productListSaga = [
    takeLatest(ProductListTypes.REQUEST_PRODUCT_LIST_FROM_COLLECTION, fetchProductListFromCollection),
    
]
