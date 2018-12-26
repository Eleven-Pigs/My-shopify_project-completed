import { UserProfileTypes } from '../redux/user'
import { takeLatest, call, select } from 'redux-saga/effects';
import { createAccessToken } from '../api'

export function* requestLogin(action) {
    const {email, password} = action
    const user = {
        email,
        password
    }
    const response =  yield call(createAccessToken, user)
    const payload = yield response.json()
    if(response.ok){     
        console.log('successss', payload)
    }else{
       
    }
}

export const userSaga = [
    takeLatest(UserProfileTypes.REQUEST_LOGIN, requestLogin)
]
