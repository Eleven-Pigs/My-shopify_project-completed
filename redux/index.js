import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { user } from './user'
import { config } from './config'
import { productDetail } from './productDetail'
import { cart } from './cart'
import { collection } from './collection'
import { productList } from './productList'
import { shop } from './shop'
import { order } from './order'
import { orderDetail } from './orderDetail'

export default combineReducers({
  user,
  config,
  productDetail,
  cart,
  collection,
  productList,
  shop,
  order,
  orderDetail,
})

