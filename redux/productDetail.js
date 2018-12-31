import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { getMoneyFormat } from './shop'
const { Types, Creators } = createActions({
    requestProductDetail: ['id'],
    requestProductDetailByHandle: ['handle'],
    requestProductDetailSuccess: ['payload'],
    requestProductDetailFailed: null,
    setTitle: ['title'],
    clearProductDetail: null,
  })

export const ProductDetailTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    title:  '',
    descriptionHtml:'',
    id: '' ,
    availableForSale: true,
    productType :'',
    images: {
        byId: {},
        allIds: []
    },
    variants: {
        byId: {},
        allIds: []
    },
    selectedVariant: 0,
})

const requestProductDetail = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestProductDetailSuccess = (state, action) => {
    const product = normalizeProductDetail(action.payload)
    const index = product.variants.allIds.length - 1
    const defaultVariantId = product.variants.allIds[index]
    
    return state.merge({
        isFetching: false,
        ...product,
        selectedVariant: defaultVariantId
    })
}
const requestProductDetailFailed = (state) => {
    return state.merge({
        ...INITIAL_STATE
    })
}

const setTitle = (state, action) => {
    const title = action.title
    return state.merge({
        title: title
    })
}

const clearProductDetail = (state) => {
    return state.merge({
        ...INITIAL_STATE
    })
}

export const productDetail = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_DETAIL]: requestProductDetail,
    [Types.REQUEST_PRODUCT_DETAIL_SUCCESS]: requestProductDetailSuccess,
    [Types.REQUEST_PRODUCT_DETAIL_FAILED]: requestProductDetailFailed,
    [Types.SET_TITLE]: setTitle,
    [Types.CLEAR_PRODUCT_DETAIL]: clearProductDetail,
})

const getReducer = (rootState) => {
    return rootState.productDetail
}



//SELECTOR

export const getPrice = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    const priceValue = selectedVariant ? selectedVariant.price : '0.00'
    const moneyFormat = getMoneyFormat(rootState)
    const price = moneyFormat.replace(/{{amount}}/,priceValue)
    return price
}

export const getSelectedVariantTitle = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    console.log('sfsafd', selectedVariant)
    return selectedVariant ? selectedVariant.title : ''
}

export const getTitle = (rootState) => {
    const state = getReducer(rootState)
    return state.title
}
export const getAvailableForSale = (rootState) => {
    const state = getReducer(rootState)
    return state.availableForSale
}

export const getDescriptionHtml = (rootState) => {
    const state = getReducer(rootState)
    return state.descriptionHtml
}

export const getImageById = (rootState, id) => {
    const state = getReducer(rootState)
    const image = state.images.byId[id]
    return image.originalSrc
}

export const getAllImages = (rootState) => {
    const state = getReducer(rootState)
    const images = state.images.allIds.map(imageId => {
         const image = getImageById(rootState, imageId)
         return image
    })
    
    return images
}

export const getVariantById = (rootState, id) => {
    const state = getReducer(rootState)
    const variant = state.variants.byId[id]
    return variant
}

export const getVariants = (rootState) => {
    const state = getReducer(rootState)
    const images = state.variants.allIds.map(variantId => {
         const image = getImageById(rootState, variantId)
         return image
    })
    
    return images
}

const normalizeProductDetail = (graphQLProduct) => {
    const node = graphQLProduct
    const images = node.images.edges.map(image => {
        const node = image.node
        const id = node.id
        return({
            [id]: {
                originalSrc: node.originalSrc,
            }
        })
    }).reduce((acc,ele) => {
        const keys = Object.keys(ele)
        const key = keys[0]
        acc[key] = ele[key]
        return acc
    }, {});

    const allImages = node.images.edges.map(image => {
        const node = image.node
        const id = node.id
        return id
    })

    const variants = node.variants.edges.map(variant => {
        const node = variant.node
        const id = node.id
        const title = node.title
        return({
            [id]: {
                price: node.price,
                imageId: node.image ? node.image.id : null,
                availableForSale: node.availableForSale,
                selectedOptions: node.selectedOptions,
                title: title
            }
        })
    }).reduce((acc,ele) => {
        const keys = Object.keys(ele)
        const key = keys[0]
        acc[key] = ele[key]
        return acc
    }, {});
    const allVariants = node.variants.edges.map(variant => {
        const node = variant.node
        const id = node.id
        return id
    })
    const selectedVariant = allVariants[0]

    const product = {
        availableForSale: node.availableForSale,
        descriptionHtml: node.descriptionHtml,
        id: node.id,
        productType: node.productType,
        title: node.title,
        images: {
            byId: images,
            allIds: allImages
        },
        variants:{
            byId: variants,
            allIds: allVariants
        },
        selectedVariant
    }
    return product
}