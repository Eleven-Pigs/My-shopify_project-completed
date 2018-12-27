import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestLogin: ['email','password'],
    requestLoginSuccess: ['payload'],
    requestLoginFail: null,
    requestRenewAccessToken: ['accessToken'],
    requestRenewAccessSuccess: ['payload'],
    requestRenewAccessFail: null,
    setAccessToken: ['accessToken', 'expiresAt']
  })

export const UserProfileTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    accessToken: '',
    expiresAt: '',
})

const requestLogin = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestLoginSuccess = (state, action) => {
    const {accessToken, expiresAt} = action.payload
    return state.merge({
        isFetching: false,
        accessToken: accessToken,
        expiresAt: expiresAt
    })
}
const setAccessToken = (state, action) => {
    const { accessToken, expiresAt} = action
    return state.merge({
        accessToken: accessToken,
        expiresAt: expiresAt
    })
}


export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: requestLogin,
    [Types.REQUEST_LOGIN_SUCCESS]: requestLoginSuccess,
    [Types.SET_ACCESS_TOKEN]: setAccessToken,
    
})

const getReducer = (rootState) => {
    return rootState.user
}

export const getAccessToken = (rootState) => {
    const state = getReducer(rootState)

    return state.accessToken
}
export const getExpiryAt = (rootState) => {
    const state = getReducer(rootState)

    return state.expiresAt
}

