import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { SHOPIFY_NAME, SHOPIFY_URL } from '../config/application'
import { CollectionTypes } from '../redux/collection'

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
    bestSelling:{
      allIds:[],
      byId: {},
    },
    latest:{
      allIds:[],
      byId: {},
    },
    finishLoad: false,
})

export const ShopTypes = Types
export default Creators


const requestShopDetail = (state) => {
 
  return state.merge({
      isFetching: true,
  })
}
const requestShopDetailSuccess = (state, action) => {
  const shop = action.payload.data.shop
  const bestSellingProduct = normalizeProducts(shop)
  const latestProduct = normalizeProducts(action.payload.data)
  return state.merge({
      isFetching: false,
      moneyFormat: shop.moneyFormat,
      name: shop.name,
      domain: shop.primaryDomain.url,
      latest: latestProduct.products,
      bestSelling: bestSellingProduct.products,
      finishLoad: true,
  })
}

export const shop = createReducer(INITIAL_STATE, {
  [Types.REQUEST_SHOP_DETAIL]: requestShopDetail,
  [Types.REQUEST_SHOP_DETAIL_SUCCESS]: requestShopDetailSuccess,
  [CollectionTypes.REQUEST_COLLECTION_LIST_SUCCESS]: requestShopDetailSuccess,
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
  return 'https://jp.maisondesabre.com'
}

export const getName = (rootState, id) => {
  const state = getReducer(rootState)
  return state.name
}
export const getBestSellingProductIds = (rootState, id) => {
  const state = getReducer(rootState)
  return state.bestSelling.allIds
}
export const getBestSellingProductById = (rootState, id) => {
  const state = getReducer(rootState)
  return state.bestSelling.byIds[id]
}
export const getLatestProductIds = (rootState, id) => {
  const state = getReducer(rootState)
  return state.latest.allIds
}
export const getLatestProductById = (rootState, id) => {
  const state = getReducer(rootState)
  return state.latest.byIds[id]
}
export const getFinishLoad = (rootState, id) => {
  const state = getReducer(rootState)
  return state.finishLoad
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