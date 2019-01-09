import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { OrderTypes } from './order';

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
  return rootState.order
}
export const getAllOrderIds = (rootState) => {
  const state = getReducer(rootState)
  return state.orders.allIds
}

export const getOrderById = (rootState, id) => {
  const state = getReducer(rootState)
  return state.orders.byId[id]
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
      byIds: productById,
      allIds: productIds,
  }

}