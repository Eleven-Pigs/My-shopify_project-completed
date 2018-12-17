import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    addNumberOfItems: null,
    requestCartDetail: null,
    requestCreateCheckout: null,
    requestCreateCheckoutSuccess: ['payload'],
    requestCreateCheckoutFail: null,
    getAsyncStorageCheckoutId: null,
    setCartId: ['id']
  })

export const CartTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    numberOfItems: 0,
    id: 0,
    webUrl: '',
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

export const cart = createReducer(INITIAL_STATE, {
    [Types.ADD_NUMBER_OF_ITEMS]: addNumberOfItems,
    [Types.REQUEST_CREATE_CHECKOUT_SUCCESS]: requestCreateCheckoutSuccess,
    [Types.SET_CART_ID]: setCartId,
})

const getReducer = (rootState) => {
    return rootState.cart
}

export const getId = (rootState) => {
    const state = getReducer(rootState)
    return state.id
}
