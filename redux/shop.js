import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestShopDetail: null,
    requestShopDetailSuccess: ['payload'],
    requestShopDetailFail: null,
    start: null,
  })

const INITIAL_STATE = Immutable({
    moneyFormat: '',
    name: '',
    url: '',
    privacyPolicy: {
      body: '',
      title: '',
    },
    refundPolicy: {
      body: '',
      title: '',
    },
    
    termsOfService: {
      body: '',
      title: '',
    },
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
      privacyPolicy: shop.privacyPolicy,
      termsOfService: shop.termsOfService,
      refundPolicy: shop.refundPolicy,
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
