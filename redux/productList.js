import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestProductListFromCollection: ['id', 'cursor'],
    requestProductListFromCollectionSuccess: ['payload'],
    requestProductListFromCollectionFail: null,
  })

export const ProductListTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    query: '',
    type: '',
    cursor: '',
    collectionId: '',
    title: '',
    products:{
        byIds: {},
        allIds: []
    },
})

const requestProductListFromCollection = (state) => {
    return state.merge({
        isFetching: true
    })
}

const requestProductListFromCollectionSuccess = (state, action) => {
    const products = normalizeProducts(action.payload)
    return state.merge({
        isFetching: false,
        ...products
    })
}

export const productList = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION]: requestProductListFromCollection,
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION_SUCCESS]: requestProductListFromCollectionSuccess,
})

const getReducer = (rootState) => {
    return rootState.collection
}
const normalizeProducts = (graphQLProducts) => {
    const node = graphQLProducts.data.node
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