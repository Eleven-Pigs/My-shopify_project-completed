import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestProductListFromCollection: ['id'],
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
    lists:{
        byIds: {},
        allIds: []
    },
})

const requestProductListFromCollection = (state) => {
    return state.merge({
        isFetching: true
    })
}

export const productList = createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRODUCT_LIST_FROM_COLLECTION]: requestProductListFromCollection,
})

const getReducer = (rootState) => {
    return rootState.collection
}
