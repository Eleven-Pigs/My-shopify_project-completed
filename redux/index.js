import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { user } from './user'
import { config } from './config'
import { productDetail } from './productDetail'
import { cart } from './cart'
export default combineReducers({
  user,
  config,
  productDetail,
  cart
})

