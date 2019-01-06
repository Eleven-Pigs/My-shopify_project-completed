import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { SHOPIFY_NAME, SHOPIFY_URL } from '../config/application'

const { Types, Creators } = createActions({
    requestShopDetail: null,
    requestShopDetailSuccess: ['payload'],
    requestShopDetailFail: null,
    start: null,
  })

const INITIAL_STATE = Immutable({
    moneyFormat: '',
    name: SHOPIFY_NAME,
    domain: SHOPIFY_URL,
    isFetching: false,
})

export const ShopTypes = Types
export default Creators


const requestMoneyFormat = (state) => {
 
  return state.merge({
      isFetching: true,
  })
}
const requestMoneyFormatSuccess = (state, action) => {
  const shop = action.payload.shop
  return state.merge({
      isFetching: false,
      moneyFormat: shop.moneyFormat,
      name: shop.name,
      domain: shop.primaryDomain.url
  })
}

export const shop = createReducer(INITIAL_STATE, {
  [Types.REQUEST_SHOP_DETAIL]: requestMoneyFormat,
  [Types.REQUEST_SHOP_DETAIL_SUCCESS]: requestMoneyFormatSuccess,
})

const getReducer = (rootState) => {
  return rootState.shop
}

export const getMoneyFormat = (rootState) => {
  const state = getReducer(rootState)
  return state.moneyFormat
}

export const getShopUrl = (rootState) => {
  const state = getReducer(rootState)
  return state.domain
}

export const getName = (rootState, id) => {
  const state = getReducer(rootState)
  return state.name
}
