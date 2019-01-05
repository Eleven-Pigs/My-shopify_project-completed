import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestRegister: ['email','password'],
    requestRegisterSuccess: ['payload'],
    requestRegisterFail: null,
    requestLogin: ['email','password'],
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
  })

export const UserProfileTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    accessToken: '',
    expiresAt: '',
    defaultAddress:'',
    addresses:{
        byIds:{},
        allIds:[]
    }
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

export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: requestLogin,
    [Types.REQUEST_LOGIN_SUCCESS]: requestLoginSuccess,
    [Types.SET_ACCESS_TOKEN]: setAccessToken,
    [Types.REQUEST_USER_ADDRESS_SUCCESS]: requestUserAddressSuccess,
    [Types.LOGOUT]: logout,
    
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

        return({
            [id]: node
        })
    }).reduce((acc,ele) => {
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
