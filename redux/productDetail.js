import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { getMoneyFormat } from './shop'
const { Types, Creators } = createActions({
    requestProductDetail: ['id'],
    setSelectedVariant: ['id'],
    requestProductDetailByHandle: ['handle'],
    requestProductDetailSuccess: ['payload'],
    requestProductDetailFailed: null,
    setTitle: ['title'],
    clearProductDetail: null,
    addCount: null,
    minusCount: null,
  })

export const ProductDetailTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    title:  '',
    isError: true,
    descriptionHtml:'',
    description: '',
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
    selectedCount: 1,
})

const requestProductDetail = (state) => {
    return state.merge({
        isFetching: true,
        isError: true,
    })
}
const requestProductDetailSuccess = (state, action) => {
    const product = normalizeProductDetail(action.payload)
    const defaultVariantId = product.variants.allIds[0]
    
    return state.merge({
        isFetching: false,
        isError: false,
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
const setSelectedVariant = (state, action) => {
    const id = action.id
    return state.merge({
        selectedVariant: id
    })
}
const minusCount = (state) => {
    const newCount = state.selectedCount - 1
    if (newCount >= 1){
        return state.merge({
            selectedCount: newCount
        })
    }else{
        return state
    }

}
const addCount = (state,) => {
    const newCount = state.selectedCount + 1
    return state.merge({
        selectedCount: newCount
    })
    
}

export const productDetail = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_DETAIL]: requestProductDetail,
    [Types.REQUEST_PRODUCT_DETAIL_BY_HANDLE]: requestProductDetail,
    [Types.REQUEST_PRODUCT_DETAIL_SUCCESS]: requestProductDetailSuccess,
    [Types.REQUEST_PRODUCT_DETAIL_FAILED]: requestProductDetailFailed,
    [Types.SET_TITLE]: setTitle,
    [Types.CLEAR_PRODUCT_DETAIL]: clearProductDetail,
    [Types.SET_SELECTED_VARIANT]: setSelectedVariant,
    [Types.ADD_COUNT]: addCount,
    [Types.MINUS_COUNT]: minusCount,
})

const getReducer = (rootState) => {
    return rootState.productDetail
}



//SELECTOR

export const getVariantPrice = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    const priceValue = selectedVariant ? selectedVariant.price : '0.00'
    const moneyFormat = getMoneyFormat(rootState)
    const price = moneyFormat.replace(/{{amount}}/,priceValue)
    return price
}

export const getTotalPrice = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    const priceValue = selectedVariant ? selectedVariant.price : '0.00'
    const totalPrice = priceValue * state.selectedCount
    const moneyFormat = getMoneyFormat(rootState)
    const price = moneyFormat.replace(/{{amount}}/,totalPrice)
    return price
}

export const getSelectedVariantTitle = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    return selectedVariant ? selectedVariant.title : ''
}

export const getSelectedVariantImage = (rootState) => {
    const state = getReducer(rootState)
    const selectedVariantId = state.selectedVariant
    const selectedVariant = state.variants.byId[selectedVariantId]
    const imageId = selectedVariant ? selectedVariant.imageId : ''
    if(imageId){
        return getImageById(rootState, imageId)
    }else{
        return null
    }
}

export const getSelectedVariant = (rootState) => {
    const state = getReducer(rootState)
    return state.selectedVariant
}
export const getVariantCount = (rootState) => {
    const state = getReducer(rootState)
    return state.variants.allIds.length
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
export const getDescription = (rootState) => {
    const state = getReducer(rootState)
    return state.description
}

export const getSelectedCount = (rootState) => {
    const state = getReducer(rootState)
    return state.selectedCount
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
export const getIsSelected = (rootState, id) => {
    const state = getReducer(rootState)
    if(state.selectedVariant === id){
        return true
    }else{
        return false
    }
}

export const getIsFetching = (rootState) => {
    const state = getReducer(rootState)
    return state.isFetching
}

export const getAllVariantsId = (rootState) => {
    const state = getReducer(rootState)
    
    return state.variants.allIds
}
export const getIsError = (rootState) => {
    const state = getReducer(rootState)
    
    return state.isError
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
        description: node.description,
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