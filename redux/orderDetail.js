import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

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
  const orders = normalizeOrders(action.payload.customer)
  const lastOrder = orders.allIds[orders.allIds.length - 1]
  const order = orders.byIds[lastOrder]
  const cursor = order.cursor
  return state.merge({
    isFetching: true,
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
const normalizeOrders = (graphQLOrders) => {
  const node = graphQLOrders


  const allOrderIds = node.orders.edges.map(edge => {
    const node = edge.node
    const id = node.id
    return id
  })

  const orderByIds = node.orders.edges.map(edge => {
    const node = edge.node
    const id = node.id
    const name = node.name
    const processedAt = node.processedAt
    const orderNumber = node.orderNumber
    const totalPrice = node.totalPrice
    const customerUrl = node.customerUrl
    const cursor = edge.cursor
    return ({
      [id]: {
        id: id,
        cursor: cursor,
        orderNumber: orderNumber,
        totalPrice: totalPrice,
        customerUrl: customerUrl,
        name: name,
        processedAt: processedAt
      }
    })
  }).reduce((acc, ele) => {
    const keys = Object.keys(ele)
    const key = keys[0]
    acc[key] = ele[key]
    return acc
  }, {});

  return {
      byIds: orderByIds,
      allIds: allOrderIds,
  }

}