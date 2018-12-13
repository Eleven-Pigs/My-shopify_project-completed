import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestProductDetail: ['id'],
    requestProductDetailSuccess: ['payload']
  })

export const ProductDetailTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    payload: null,
    text: 'Expo with Redux and Saga',
})

const requestProductDetail = (state, action) => {
    return state.merge({
        isFetching: true,
    })
}
const requestProductDetailSuccess = (state, action) => {
    return state.merge({
        isFetching: false,
        payload: action.payload
    })
}

export const productDetail = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_DETAIL]: requestProductDetail,
    [Types.REQUEST_PRODUCT_DETAIL_SUCCESS]: requestProductDetailSuccess,
})

const getReducer = (rootState) => {
    return rootState.productDetail
}

export const getTitle = (rootState) => {
    const state = getReducer(rootState)

    if(state.payload){
        return state.payload.data.node.title
    }
    else{
        return ''
    }
}

