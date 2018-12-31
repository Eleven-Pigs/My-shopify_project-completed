import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestMoneyFormat: null,
    requestMoneyFormatSuccess: ['payload'],
    requestMoneyFormatFail: null,
    start: null,
  })

const INITIAL_STATE = Immutable({
    moneyFormat: "",
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
  return state.merge({
      isFetching: false,
      moneyFormat: action.payload.shop.moneyFormat
  })
}

export const shop = createReducer(INITIAL_STATE, {
  [Types.REQUEST_MONEY_FORMAT]: requestMoneyFormat,
  [Types.REQUEST_MONEY_FORMAT_SUCCESS]: requestMoneyFormatSuccess,
})

const getReducer = (rootState) => {
  return rootState.shop
}

export const getMoneyFormat = (rootState) => {
  const state = getReducer(rootState)
  return state.moneyFormat
}
