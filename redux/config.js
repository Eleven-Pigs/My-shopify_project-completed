import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {SHOPIFY_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN} from '../config/application'
import { theme } from '../constants/Theme'

const { Types, Creators } = createActions({
    helloWorld: null,
  })

export const ConfigTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    baseURL: SHOPIFY_URL,
    shopifyStoreAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    primaryColor: 'red',
    backgroundColor: theme.listBackground
})


export const config = createReducer(INITIAL_STATE, {
})


const getReducer = (rootState) => {
    return rootState.config
}
export const getPrimaryColor = (rootState) => {
    state = getReducer(rootState)
    return state.primaryColor
}
const getBackgroundColor = (rootState) => {
    state = getReducer(rootState)
    return state.backgroundColor
}
