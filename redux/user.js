import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestLogin: ['email','password'],
    requestLoginSuccess: ['payload'],
    requestLoginFail: null,
    accessToken: '',
    expiresAt: '',
  })

export const UserProfileTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
})

const requestLogin = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestLoginSuccess = (state, action) => {
    const {accessToken, expiresAt} = action.payload.data.customerAccessTokenCreate.customerAccessToken
    return state.merge({
        isFetching: false,
        accessToken: accessToken,
        expiresAt: expiresAt
    })
}

export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: requestLogin,
    [Types.REQUEST_LOGIN_SUCCESS]: requestLoginSuccess,
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

