import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {SHOPIFY_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN} from '../config/application'
import { theme } from '../constants/Theme'

const { Types, Creators } = createActions({
    setPrimaryColor: ['color'],
  })

export const ConfigTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    baseURL: SHOPIFY_URL,
    shopifyStoreAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    primaryColor: theme.primaryColor,
    headerBackIconColor: theme.primaryColor,
    activeBottomIconColor: theme.primaryColor,
    inactiveBottomIconColor: theme.inactiveBottomIconColor,
    generalIconColor: theme.primaryColor,
    bottomTabBarColor: theme.bottomTabBarColor,
    buttonBackgroundColor: theme.primaryColor,
    buttonTextColor: theme.buttonTextColor,
    backgroundColor: theme.listBackground
})

const setPrimaryColor = (state, action) => {
    const color = action.color
    return state.merge({
        primaryColor: color
    })
}

export const config = createReducer(INITIAL_STATE, {
    [Types.SET_PRIMARY_COLOR]: setPrimaryColor,
})

const getReducer = (rootState) => {
    return rootState.config
}
export const getPrimaryColor = (rootState) => {
    state = getReducer(rootState)
    return state.primaryColor
}
export const getBottomTabBarColor = (rootState) => {
    state = getReducer(rootState)
    return state.bottomTabBarColor
}
export const getActiveBottomIconColor = (rootState) => {
    state = getReducer(rootState)
    return state.activeBottomIconColor
}
export const getInactiveBottomIconColor = (rootState) => {
    state = getReducer(rootState)
    return state.inactiveBottomIconColor
}
export const getButtonBackgroundColor = (rootState) => {
    state = getReducer(rootState)
    return state.buttonBackgroundColor
}
export const getButtonTextColor = (rootState) => {
    state = getReducer(rootState)
    return state.buttonTextColor
}
export const getHeaderBackIconColor = (rootState) => {
    state = getReducer(rootState)
    return state.headerBackIconColor
}
export const getGeneralIconColor = (rootState) => {
    state = getReducer(rootState)
    return state.generalIconColor
}
const getBackgroundColor = (rootState) => {
    state = getReducer(rootState)
    return state.backgroundColor
}
export const getConfig = (rootState) => {
    state = getReducer(rootState)
    return {
        shopifyStoreAccessToken: state.shopifyStoreAccessToken,
        baseUrl: state.baseURL
    }
}

