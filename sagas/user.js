import { UserProfileTypes } from '../redux/user'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createAccessToken, renewAccessToken, registerUser } from '../api'
import userActions from '../redux/user'
import { getAccessToken, getExpiryAt } from '../redux/user'
import { AsyncStorage } from "react-native"


export function* requestRegister(action) {
    const {email, password} = action
    const user = {
        email,
        password
    }
    const response =  yield call(registerUser, user)
    const payload = yield response.json()
    if(response.ok){     
        if (payload.data.customerCreate.customer){
            yield put(userActions.requestRegisterSuccess())
        }else{
            yield put(userActions.requestRegisterFail()) 
        }
    }else{
        yield put(userActions.requestRegisterFail()) 
    }
}

export function* requestLogin(action) {
    const {email, password} = action
    const user = {
        email,
        password
    }
    const response =  yield call(createAccessToken, user)
    const payload = yield response.json()
    if(response.ok){     
        yield put(userActions.requestLoginSuccess(payload.data.customerAccessTokenCreate.customerAccessToken)) 
        const accessToken = yield select(getAccessToken)
        const expiryAt = yield select(getExpiryAt)
        yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken)   
        yield call([AsyncStorage, 'setItem'], 'expiryAt', expiryAt) 
    }else{
        yield put(userActions.requestLoginFail(payload)) 
    }
}

export function* requestRenewAccessToken(action) {


    const accessToken = action.accessToken
    const response =  yield call(renewAccessToken, accessToken)
    const payload = yield response.json()
    if(response.ok){
        yield put(userActions.requestLoginSuccess(payload.data.customerAccessTokenRenew.customerAccessToken)) 
        const accessToken = yield select(getAccessToken)
        const expiryAt = yield select(getExpiryAt)
        yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken)   
        yield call([AsyncStorage, 'setItem'], 'expiryAt', expiryAt) 
    }else{
        yield put(userActions.requestLoginFail(payload)) 
    }
}

export const userSaga = [
    takeLatest(UserProfileTypes.REQUEST_LOGIN, requestLogin),
    takeLatest(UserProfileTypes.REQUEST_REGISTER, requestRegister),
    takeLatest(UserProfileTypes.REQUEST_RENEW_ACCESS_TOKEN, requestRenewAccessToken)
]
