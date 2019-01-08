import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  requestUserOrders: null,
  requestUserOrdersSuccess: ['payload'],
  requestUserOrdersFail: null,
  })

const INITIAL_STATE = Immutable({
  isFetching: false,
})

export const OrderTypes = Types
export default Creators


const requestUserOrders = (state, action) => {
  return state.merge({
    isFetching: true
  })
}
const requestUserOrdersSuccess = (state, action) => {
  return state.merge({
    isFetching: true
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

//Normaliza
const normalizeProducts = (graphQLProducts) => {
  const node = graphQLProducts


  const allProductIds = node.products.edges.map(edge => {
      const node = edge.node
      const id = node.id
      return id
  })

  const productByIds = node.products.edges.map(edge => {
      const cursor = edge.cursor
      const node = edge.node 
      const id = node.id
      const title = node.title
      const image = node.images.edges.length > 0 ? node.images.edges[0].node.originalSrc : null
      const maxVariantPrice = node.priceRange.maxVariantPrice.amount
      const minVariantPrice = node.priceRange.minVariantPrice.amount
      const currencyCode = node.priceRange.maxVariantPrice.currencyCode

      return({
          [id]: {
              id: id,
              cursor: cursor,
              title: title,
              image: image,
              maxVariantPrice: maxVariantPrice,
              minVariantPrice: minVariantPrice,
              currencyCode: currencyCode
          }
      })
  }).reduce((acc,ele) => {
      const keys = Object.keys(ele)
      const key = keys[0]
      acc[key] = ele[key]
      return acc
  }, {});

  return {
      products: {
          byIds: productByIds,
          allIds: allProductIds
      },
  }

}