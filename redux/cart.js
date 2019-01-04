import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { getMoneyFormat } from './shop'
import { UserProfileTypes } from '../redux/user'
const { Types, Creators } = createActions({
    addNumberOfItems: null,
    requestCartDetail: null,
    requestCartDetailSuccess: ['payload'],
    requestCartDetailFail: null,
    requestCreateCheckout: null,
    requestCreateCheckoutSuccess: ['payload'],
    requestCreateCheckoutFail: null,
    setCartId: ['id'],
    requestAddProductToCheckout: ['product'],
    requestAddProductToCheckoutSuccess: ['payload'],
    requestAddProductToCheckoutFail: null,
    resetIsAddedToCart: null,
    requestAddEmailAddress: ['email','address'],
    requestAddEmailAddressSuccess: null,
    requestAddEmailAddressFail: null,
    setAddressToCheckoutSuccess: null,
    setAddressToCheckoutFail: null,
    clearCart: null,
  })

export const CartTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isAddingToCart: false,
    isFetching: false,
    numberOfItems: 0,
    isAdded: false,
    id: '',
    webUrl: '',
    products:{
        byIds: {},
        allIds: []
    },
    order: {},
    shippingAddress: {},
    subTotalPrice: '',
    totalPrice: '',
})

const addNumberOfItems = (state) => {
    const numberOfItems = state.numberOfItems + 1
    return state.merge({
        numberOfItems: numberOfItems
    })
}

const requestCreateCheckoutSuccess = (state, action) => {
    const checkout = action.payload.data.checkoutCreate.checkout
    const id = checkout.id
    const webUrl = checkout.webUrl
    return state.merge({
        id: id,
        webUrl: webUrl,
    })  
}
const setCartId = (state, action) => {
    const id = action.id
    return state.merge({
        id: id,
    })  
}

const requestAddProductToCheckout = (state, action) => {
    return state.merge({
        isFetching: true,
    })  
}
const requestAddProductToCheckoutSuccess = (state, action) => {
    return state.merge({
        isFetching: false,
        isAdded: true,
    })  
}

const requestCartDetail = (state, action) => {
    return state.merge({
        isFetching: true
    }) 
}

const requestCartDetailSuccess = (state, action) => {
    const cart = normalizeCartDetail(action.payload) 
    return state.merge({
        isFetching: false,
        ...cart
    }) 
}
const resetIsAddedToCart = (state, action) => {
    return state.merge({
        isAdded: false,
    }) 
}
const requestAddEmailAddress = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestAddEmailAddressSuccess = (state, action) => {
    return state.merge({
        isFetching: false,
    })
}
const clearCart = (state, action) => {
    return INITIAL_STATE
}



export const cart = createReducer(INITIAL_STATE, {
    [Types.RESET_IS_ADDED_TO_CART]: resetIsAddedToCart,
    [Types.ADD_NUMBER_OF_ITEMS]: addNumberOfItems,
    [Types.REQUEST_CREATE_CHECKOUT_SUCCESS]: requestCreateCheckoutSuccess,
    [Types.SET_CART_ID]: setCartId,
    [Types.REQUEST_ADD_PRODUCT_TO_CHECKOUT]: requestAddProductToCheckout,
    [Types.REQUEST_ADD_PRODUCT_TO_CHECKOUT_SUCCESS]: requestAddProductToCheckoutSuccess,
    [Types.REQUEST_CART_DETAIL]: requestCartDetail,
    [Types.REQUEST_CART_DETAIL_SUCCESS]: requestCartDetailSuccess,
    [Types.REQUEST_ADD_EMAIL_ADDRESS]: requestAddEmailAddress,
    [Types.REQUEST_ADD_EMAIL_ADDRESS_SUCCESS]: requestAddEmailAddressSuccess,
    [Types.REQUEST_ADD_EMAIL_ADDRESS_SUCCESS]: requestAddEmailAddressSuccess,
    [Types.CLEAR_CART]: clearCart,
})

const getReducer = (rootState) => {
    return rootState.cart
}

export const getId = (rootState) => {
    const state = getReducer(rootState)
    return state.id
}
export const getIsProductAdded = (rootState) => {
    const state = getReducer(rootState)
    return state.isAdded
}
export const getAllProductIds = (rootState) => {
    const state = getReducer(rootState)
    return state.products.allIds
}

export const getProductById = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id]
}
export const getCartItemCount = (rootState) => {
    const state = getReducer(rootState)
    return state.numberOfItems
}
export const getWebUrl = (rootState) => {
    const state = getReducer(rootState)
    return state.webUrl
}

export const getProductTitle = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id].title
}
export const getProductVariantTitle = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id].variantTitle
}
export const getProductPrice = (rootState, id) => {
    const state = getReducer(rootState)
    const moneyFormat = getMoneyFormat(rootState)
    const price = moneyFormat.replace(/{{amount}}/,state.products.byIds[id].price)
    
    return price
}
export const getProductImage = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id].image
}
export const getProductQuantity = (rootState, id) => {
    const state = getReducer(rootState)
    return state.products.byIds[id].quantity
}
export const getTotalPrice = (rootState, id) => {
    const state = getReducer(rootState)
    const moneyFormat = getMoneyFormat(rootState)
    const price = moneyFormat.replace(/{{amount}}/,state.totalPrice)
    
    return price
}
export const getShippingAddress = (rootState, id) => {
    const state = getReducer(rootState)
    
    return state.shippingAddress
}



const normalizeCartDetail = (graphQLCart) => {
    const node = graphQLCart.data.node
    const {
        shippingAddress,
        subTotalPrice,
        totalPrice,
        webUrl,
        ready,
    } = node

    const allProducts = node.lineItems.edges.map(lineItem => {
        const node = lineItem.node
        const id = node.id
        return id
    })

    const productsByIds = node.lineItems.edges.map(lineItem => {
        const node = lineItem.node
        const id = node.id
        const variantId = node.variant.id
        const productId = node.variant.product.id
        const title = node.title
        const quantity = node.quantity
        const variantTitle = node.variant.title
        const image = node.variant.image.originalSrc
        const price = node.variant.price
        return({
            [id]: {
                id: id,
                price: price,
                variantId: variantId,
                title: title,
                quantity: quantity,
                variantTitle: variantTitle,
                productId: productId,
                image: image,
                price: price,
            }
        })
    }).reduce((acc,ele) => {
        const keys = Object.keys(ele)
        const key = keys[0]
        acc[key] = ele[key]
        return acc
    }, {});

    const numberOfItems = allProducts.length

    return {
        products: {
            byIds: productsByIds,
            allIds: allProducts
        },
        shippingAddress: shippingAddress,
        subTotalPrice: subTotalPrice,
        totalPrice: totalPrice,
        webUrl: webUrl,
        ready: ready,
        numberOfItems: numberOfItems,
    }

}