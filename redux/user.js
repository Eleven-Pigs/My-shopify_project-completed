import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestRegister: ['email', 'password'],
    requestRegisterSuccess: null,
    requestRegisterFail: ['error'],
    registerErrorShown: null,
    requestLogin: ['email', 'password'],
    requestLoginSuccess: ['payload'],
    requestLoginFail: null,
    requestRenewAccessToken: ['accessToken'],
    requestRenewAccessSuccess: ['payload'],
    requestRenewAccessFail: null,
    setAccessToken: ['accessToken', 'expiresAt'],
    logout: null,
    requestAssociateUserToCheckoutSuccess: null,
    requestAssociateUserToCheckoutFail: null,
    requestUserAddress: null,
    requestUserAddressSuccess: ['payload'],
    requestUserAddressFail: null,
    requestCreateUserAddress: ['address'],
    requestCreateUserAddressSuccess: null,
    requestCreateUserAddressFail: ['error'],
    resetRegister: null,
    requestUserAddressSuccessEmpty: null,
    resetLoginError: null,
    resetRequestCreateUserAddress: null
})

export const UserProfileTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetchingLogin: false,
    isFetchingRegister: false,
    isCreatingAddress: false,
    isCreatingAddressSuccess: false,
    creatingAddressError: false,
    loginError: false,
    accessToken: '',
    expiresAt: '',
    defaultAddress: '',
    addresses: {
        byIds: {},
        allIds: []
    },
    fetchingRegisterError: false,
    fetchingRegisterSuccess: false,
    errorText: 'Something went wrong, please try again.'
})

const requestLogin = (state, action) => {
    return state.merge({
        isFetchingLogin: true,
    })
}
const requestLoginSuccess = (state, action) => {
    const { accessToken, expiresAt } = action.payload
    return state.merge({
        isFetchingLogin: false,
        accessToken: accessToken,
        expiresAt: expiresAt
    })
}
const setAccessToken = (state, action) => {
    const { accessToken, expiresAt } = action
    return state.merge({
        accessToken: accessToken,
        expiresAt: expiresAt
    })
}

const logout = (state) => {
    return INITIAL_STATE
}

const requestUserAddressSuccess = (state, action) => {
    const defaultAddress = action.payload.data.customer.defaultAddress.id
    const addresses = normalizeAddress(action.payload.data.customer)
    return state.merge({
        defaultAddress: defaultAddress,
        addresses
    })
}
const requestRegister = (state, action) => {
    return state.merge({
        isFetchingRegister: true
    })
}
const requestRegisterSuccess = (state, action) => {
    return state.merge({
        isFetchingRegister: false,
        fetchingRegisterSuccess: true,
    })
}
const requestRegisterFail = (state, action) => {
    return state.merge({
        isFetchingRegister: false,
        fetchingRegisterError: true,
        errorText: action.error ? action.error : INITIAL_STATE.errorText,
    })
}
const registerErrorShown = (state, action) => {
    return state.merge({
        isFetchingRegister: false,
        fetchingRegisterError: false,
        errorText: action.error ? action.error : INITIAL_STATE.errorText,
    })
}
export const resetRegister = (state) => {
    return state.merge({
        isFetchingRegister: false,
        fetchingRegisterError: false,
        errorText: INITIAL_STATE.errorText,
        fetchingRegisterSuccess: false,
    })
}

export const requestLoginFail = (state) => {
    return state.merge({
        loginError: true,
        isFetchingLogin: false,
    })
}
export const resetLoginError = (state) => {
    return state.merge({
        loginError: false,
    })
}

export const requestCreateUserAddress = (state) => {
    return state.merge({
        isCreatingAddress: true,
    })
}
export const requestCreateUserAddressSuccess = (state) => {
    return state.merge({
        isCreatingAddressSuccess: true,
        isCreatingAddress: false,
    })
}

export const requestCreateUserAddressFail = (state, action) => {
    return state.merge({
        isCreatingAddress: false,
        creatingAddressError: true,
        errorText: action.error ? action.error : INITIAL_STATE.errorText,
    })
}
export const resetRequestCreateUserAddress = (state, action) => {
    return state.merge({
        isCreatingAddress: false,
        creatingAddressError: false,
        isCreatingAddressSuccess: false,
        errorText: INITIAL_STATE.errorText,
    })
}




export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: requestLogin,
    [Types.REQUEST_REGISTER]: requestRegister,
    [Types.REQUEST_REGISTER_SUCCESS]: requestRegisterSuccess,
    [Types.RESET_REGISTER]: resetRegister,
    [Types.REQUEST_REGISTER_FAIL]: requestRegisterFail,
    [Types.REGISTER_ERROR_SHOWN]: registerErrorShown,
    [Types.REQUEST_LOGIN_SUCCESS]: requestLoginSuccess,
    [Types.SET_ACCESS_TOKEN]: setAccessToken,
    [Types.REQUEST_USER_ADDRESS_SUCCESS]: requestUserAddressSuccess,
    [Types.REQUEST_CREATE_USER_ADDRESS]: requestCreateUserAddress,
    [Types.REQUEST_CREATE_USER_ADDRESS_SUCCESS]: requestCreateUserAddressSuccess,
    [Types.REQUEST_CREATE_USER_ADDRESS_FAIL]: requestCreateUserAddressFail,
    [Types.RESET_REQUEST_CREATE_USER_ADDRESS]: resetRequestCreateUserAddress,
    [Types.LOGOUT]: logout,
    [Types.REQUEST_LOGIN_FAIL]: requestLoginFail,
    [Types.RESET_LOGIN_ERROR]: resetLoginError,
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
export const getIsLogin = (rootState) => {
    const state = getReducer(rootState)
    const isLogin = state.accessToken ? true : false
    return isLogin
}
export const getDefaultAddressId = (rootState) => {
    const state = getReducer(rootState)
    return state.defaultAddress
}
export const getAddressById = (rootState, id) => {

    const state = getReducer(rootState)
    return state.addresses.byIds[id]
}
export const getAllAddressIds = (rootState) => {

    const state = getReducer(rootState)
    return state.addresses.allIds
}

export const getFetchingRegister = (rootState, id) => {
    const state = getReducer(rootState)
    return state.isFetchingRegister
}
export const getErrorText = (rootState, id) => {
    const state = getReducer(rootState)
    return state.errorText
}
export const getRegisterSuccess = (rootState, id) => {
    const state = getReducer(rootState)
    return state.fetchingRegisterSuccess
}

export const getFetchingRegisterError = (rootState, id) => {
    const state = getReducer(rootState)
    return state.fetchingRegisterError
}
export const getIsFetching = (rootState) => {
    const state = getReducer(rootState)
    return state.isFetchingLogin
}
export const getLoginError = (rootState) => {
    const state = getReducer(rootState)
    return state.loginError
}
export const getIsAddressDefault = (rootState, id) => {
    const state = getReducer(rootState)

    if (state.defaultAddress === id) {
        return true
    } else {
        return false
    }
}
export const getIsCreatingAddress = (rootState) => {
    const state = getReducer(rootState)
    return state.isCreatingAddress
}
export const getCreatingAddressError = (rootState) => {
    const state = getReducer(rootState)
    return state.creatingAddressError
}
export const getIsCreatingAddressSuccess = (rootState) => {
    const state = getReducer(rootState)
        return state.isCreatingAddressSuccess
}

//Normalize
const normalizeAddress = (customer) => {
    const edges = customer.addresses.edges
    const allIds = edges.map(edge => {
        const node = edge.node
        return node.id
    })
    const addressByIds = edges.map(edge => {
        const node = edge.node
        const id = node.id

        return ({
            [id]: node
        })
    }).reduce((acc, ele) => {
        const keys = Object.keys(ele)
        const key = keys[0]
        acc[key] = ele[key]
        return acc
    }, {});

    return {
        byIds: addressByIds,
        allIds: allIds,
    }
}
