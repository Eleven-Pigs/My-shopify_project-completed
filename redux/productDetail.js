import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestProductDetail: ['id'],
    requestProductDetailSuccess: ['payload'],
    requestProductDetailFailed: null,
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
        allImages: []
    },
    variants: {
        byId: {},
        allVariants: []
    },
    selectedVariant: '',
})

const requestProductDetail = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestProductDetailSuccess = (state, action) => {
    const product = normalizeProductDetail(action.payload)
    return state.merge({
        isFetching: false,
        ...product
    })
}
const requestProductDetailFailed = (state) => {
    return state.merge({
        ...INITIAL_STATE
    })
}

export const productDetail = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_DETAIL]: requestProductDetail,
    [Types.REQUEST_PRODUCT_DETAIL_SUCCESS]: requestProductDetailSuccess,
    [Types.REQUEST_PRODUCT_DETAIL_FAILED]: requestProductDetailFailed,
})

const getReducer = (rootState) => {
    return rootState.productDetail
}

export const getTitle = (rootState) => {
    const state = getReducer(rootState)
    return state.title
}

export const getImageById = (rootState, id) => {
    const state = getReducer(rootState)
    const image = state.images.byId[id]
    return image.originalSrc
}

export const getAllImages = (rootState) => {
    const state = getReducer(rootState)
    const images = state.images.allImages.map(imageId => {
         const image = getImageById(rootState, imageId)
         return image
    })
    
    return images
}

const normalizeProductDetail = (graphQLProduct) => {
    const node = graphQLProduct.data.node
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
        return({
            [id]: {
                price: node.price,
                imageId: node.image.id,
                availableForSale: node.availableForSale,
                selectedOptions: node.selectedOptions,
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
            allImages: allImages
        },
        variants:{
            byId: variants,
            allVariants: allVariants
        },
        selectedVariant
    }
    return product
}