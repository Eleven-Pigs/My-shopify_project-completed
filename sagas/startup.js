import { takeLatest, select, put, call } from 'redux-saga/effects';
import { StartupTypes } from '../redux/startup'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"

export function* start() {
    
    const id = yield call([AsyncStorage, 'getItem'], 'cartId')
    if (id){
        yield put(CartActions.setCartId(id))
        yield put(CartActions.requestCartDetail())
        
    }else{
        yield put(CartActions.requestCreateCheckout())
    }
    

}

export const startupSaga = [
    takeLatest(StartupTypes.START, start),
]
