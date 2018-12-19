import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

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
  })

export const CartTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    numberOfItems: 0,
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
        isFetching: true
    })  
}
const requestAddProductToCheckoutSuccess = (state, action) => {
    return state.merge({
        isFetching: false
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

export const cart = createReducer(INITIAL_STATE, {
    [Types.ADD_NUMBER_OF_ITEMS]: addNumberOfItems,
    [Types.REQUEST_CREATE_CHECKOUT_SUCCESS]: requestCreateCheckoutSuccess,
    [Types.SET_CART_ID]: setCartId,
    [Types.REQUEST_ADD_PRODUCT_TO_CHECKOUT]: requestAddProductToCheckout,
    [Types.REQUEST_ADD_PRODUCT_TO_CHECKOUT_SUCCESS]: requestAddProductToCheckoutSuccess,
    [Types.REQUEST_CART_DETAIL]: requestCartDetail,
    [Types.REQUEST_CART_DETAIL_SUCCESS]: requestCartDetailSuccess,
})

const getReducer = (rootState) => {
    return rootState.cart
}

export const getId = (rootState) => {
    const state = getReducer(rootState)
    return state.id
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
        const id = node.variant.id
        const title = node.title
        const quantity = node.quantity
        const variantTitle = node.variant.title
        return({
            [id]: {
                title: title,
                quantity: quantity,
                variantTitle: variantTitle,
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
            byIds: productsByIds,
            allIds: allProducts
        },
        shippingAddress: shippingAddress,
        subTotalPrice: subTotalPrice,
        totalPrice: totalPrice,
        webUrl: webUrl,
        ready: ready,
    }

}