import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {getMoneyFormat} from './shop'

const { Types, Creators } = createActions({
  requestUserOrderDetail: ['id'],
  requestUserOrderDetailSuccess: ['payload'],
  requestUserOrderDetailFail: null,
})

const INITIAL_STATE = Immutable({
  isFetching: false,
  products: {
    allIds: [],
    byId: {}
  },
  customerUrl: '',
  name: '',
  orderNumber: '',
  processedAt: '',
  shippingAddress: {
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    firstName: '',
    lastName: '',
  },
  subtotalPrice: '',
  totalPrice: '',
  totalShippingPrice: '',
  totalTax: '',
})

export const OrderDetailTypes = Types
export default Creators


const requestUserOrderDetail = (state, action) => {
  return state.merge({
    isFetching: true
  })
}
const requestUserOrderDetailSuccess = (state, action) => {
  const order = action.payload.data.node
  const products = normalizeProducts(order)
  return state.merge({
    isFetching: false,
    customerUrl: order.customerUrl,
    name: order.name,
    orderNumber: order.orderNumber,
    processedAt: order.processedAt,
    shippingAddress: order.shippingAddress,
    subtotalPrice: order.subtotalPrice,
    totalPrice: order.totalPrice,
    totalShippingPrice: order.totalShippingPrice,
    totalTax: order.totalTax,
    products: products
  })
}
const requestUserOrderDetailFail = (state, action) => {
  return state.merge({
    isFetching: false
  })
}

export const orderDetail = createReducer(INITIAL_STATE, {
  [Types.REQUEST_USER_ORDER_DETAIL]: requestUserOrderDetail,
  [Types.REQUEST_USER_ORDER_DETAIL_SUCCESS]: requestUserOrderDetailSuccess,
  [Types.REQUEST_USER_ORDER_DETAIL_FAIL]: requestUserOrderDetailFail,
})

const getReducer = (rootState) => {
  return rootState.orderDetail
}
export const getProductIds = (rootState) => {
  const state = getReducer(rootState)
  return state.products.allIds
}
export const getProductById = (rootState, id) => {
  const state = getReducer(rootState)
  return state.products.byId[id]
}

export const getCustomerUrl = (rootState) => {
  const state = getReducer(rootState)
  return state.customerUrl
}
export const getName = (rootState) => {
  const state = getReducer(rootState)
  return state.name
}
export const getOrderNumber = (rootState) => {
  const state = getReducer(rootState)
  return state.orderNumber
}
export const getProcessedAt = (rootState) => {
  const state = getReducer(rootState)
  return state.processedAt
}
export const getShippingAddress = (rootState) => {
  const state = getReducer(rootState)
  return state.shippingAddress
}
export const getSubtotalPrice = (rootState) => {
  const state = getReducer(rootState)
  const moneyFormat = getMoneyFormat(rootState)
  return moneyFormat.replace(/{{amount}}/,state.subtotalPrice)
}
export const getTotalPrice = (rootState) => {
  const state = getReducer(rootState)
  const moneyFormat = getMoneyFormat(rootState)
  return moneyFormat.replace(/{{amount}}/,state.totalPrice)
}
export const getTotalShippingPrice = (rootState) => {
  const state = getReducer(rootState)
  const moneyFormat = getMoneyFormat(rootState)
  return moneyFormat.replace(/{{amount}}/,state.totalShippingPrice)
}
export const getTotalTax = (rootState) => {
  const state = getReducer(rootState)
  const moneyFormat = getMoneyFormat(rootState)
  return moneyFormat.replace(/{{amount}}/,state.totalTax)
}


//Normaliza
const normalizeProducts = (graphQLOrders) => {
  const node = graphQLOrders

  const productIds = node.lineItems.edges.map(edge => {
    return edge.cursor
  })

  const productById = node.lineItems.edges.map(edge => {
    const node = edge.node
    const id = edge.cursor
    const quantity = node.quantity
    const title = node.title
    const variantTitle = node.variant.title
    
    return ({
      [id]: {
        id: id,
        quantity: quantity,
        title: title,
        variantTitle: variantTitle
      }
    })
  }).reduce((acc, ele) => {
    const keys = Object.keys(ele)
    const key = keys[0]
    acc[key] = ele[key]
    return acc
  }, {});

  return {
      byId: productById,
      allIds: productIds,
  }

}