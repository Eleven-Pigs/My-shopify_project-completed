import { UserProfileTypes } from '../redux/user'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createAccessToken } from '../api'
import userActions from '../redux/user'
import { getAccessToken, getExpiryAt } from '../redux/user'
import { AsyncStorage } from "react-native"

export function* requestLogin(action) {
    const {email, password} = action
    const user = {
        email,
        password
    }
    const response =  yield call(createAccessToken, user)
    const payload = yield response.json()
    if(response.ok){     
        yield put(userActions.requestLoginSuccess(payload)) 
        const accessToken = yield select(getAccessToken)
        const expiryAt = yield select(getExpiryAt)
        yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken)   
        yield call([AsyncStorage, 'setItem'], 'expiryAt', expiryAt) 
    }else{
        yield put(userActions.requestLoginFail(payload)) 
    }
}

export const userSaga = [
    takeLatest(UserProfileTypes.REQUEST_LOGIN, requestLogin)
]
