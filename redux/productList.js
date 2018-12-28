import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestProductListFromCollection: ['id', 'cursor'],
    requestProductListFromCollectionByHandle: ['handle', 'cursor'],
    requestProductListFromCollectionSuccess: ['payload'],
    requestProductListFromCollectionSuccessEmpty: null,
    requestProductListFromCollectionFail: null,

  })

export const ProductListTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    query: '',
    type: '',
    cursor: null,
    collectionId: '',
    title: '',
    products:{
        byIds: {},
        allIds: []
    },
    endOfProduct: false,
})

const requestProductListFromCollection = (state) => {
    return state.merge({
        isFetching: true
    })
}

const requestProductListFromCollectionSuccess = (state, action) => {
    const productList = normalizeProducts(action.payload)
    const lastProductId = productList.products.allIds[productList.products.allIds.length - 1]
    const lastProduct = productList.products.byIds[lastProductId]
    const cursor = lastProduct.cursor
 
    return state.merge({
        isFetching: false,
        title: productList.title,
        collectionId: productList.collectionId,
        products:{
            byIds: {...state.products.byIds, ...productList.products.byIds},
            allIds: state.products.allIds.concat(productList.products.allIds)
        },
        cursor: cursor,
    })
}

const requestProductListFromCollectionSuccessEmpty = (state) => {
 
    return state.merge({
        isFetching: false,
        endOfProduct: true,
    })
}
export const productList = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION]: requestProductListFromCollection,
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION_BY_HANDLE]: requestProductListFromCollection,
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION_SUCCESS]: requestProductListFromCollectionSuccess,
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION_SUCCESS_EMPTY]: requestProductListFromCollectionSuccessEmpty,
})

const getReducer = (rootState) => {
    return rootState.productList
}

export const getAllProductIds = (rootState) => {
    const state = getReducer(rootState)
    return state.products.allIds
}

export const getProductById = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id]
}

export const getCursor = (rootState) => {
    const state = getReducer(rootState)
    return state.cursor
}
export const getEndOfProduct = (rootState) => {
    const state = getReducer(rootState)
    return state.endOfProduct
}


const normalizeProducts = (graphQLProducts) => {
    const node = graphQLProducts
    const {
        title,
        id,
    } = node


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
        collectionId: id,
        title: title,
    }

}