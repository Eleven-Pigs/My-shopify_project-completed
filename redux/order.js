import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  requestUserOrders: null,
  requestUserOrdersSuccess: ['payload'],
  requestUserOrdersFail: null,
})

const INITIAL_STATE = Immutable({
  isFetching: false,
  cursor: null,
  orders: {
    allIds: [],
    byId: {}
  }
})

export const OrderTypes = Types
export default Creators


const requestUserOrders = (state, action) => {
  return state.merge({
    isFetching: true
  })
}
const requestUserOrdersSuccess = (state, action) => {
  const orders = normalizeOrders(action.payload.customer)
  const lastOrder = orders.allIds[orders.allIds.length - 1]
  const order = orders.byIds[lastOrder]
  const cursor = order.cursor
  return state.merge({
    isFetching: true,
    orders:{
      byId: {...state.orders.byId, ...orders.byIds},
      allIds: state.orders.allIds.concat(orders.allIds)
    },
    cursor: cursor
  })
}
const requestUserOrdersFail = (state, action) => {
  return state.merge({
    isFetching: true
  })
}



export const order = createReducer(INITIAL_STATE, {
  [Types.REQUEST_USER_ORDERS]: requestUserOrders,
  [Types.REQUEST_USER_ORDERS_SUCCESS]: requestUserOrdersSuccess,
  [Types.REQUEST_USER_ORDERS_FAIL]: requestUserOrdersFail,
})

const getReducer = (rootState) => {
  return rootState.order
}
export const getOrderCursor = (rootState) =>{
  const state = getReducer(rootState)
  return state.cursor
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