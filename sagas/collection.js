import { CollectionTypes } from '../redux/collection'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getCollections } from '../api'
import CollectionActions from '../redux/collection'

export function* fetchCollections() {
    try{
        const response =  yield call(getCollections)
        const payload = yield response.json()
        if(response.ok){     
            yield put(CollectionActions.requestCollectionListSuccess(payload))   
        }else{
            yield put(CartActions.requestCollectionListFail())
        }
    }catch(e){
        console.log('error',e)
    }
}




export const collectionSaga = [
    takeLatest(CollectionTypes.REQUEST_COLLECTION_LIST, fetchCollections),
    
]
