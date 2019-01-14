import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestCollectionList: null,
    requestCollectionListSuccess: ['payload'],
    requestCollectionListFail: null,
    clearCollections: null,
  })

export const CollectionTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
    lists:{
        byIds: {},
        allIds: []
    },
})

const requestCollectionList = (state) => {
    return state.merge({
        isFetching: true
    })
}

const requestCollectionListSuccess = (state, action) => {
    const collection = normalizeCollectionList(action.payload)
    return state.merge({
        isFetching: false,
        ...collection
    })
}
const clearCollections = (state, action) => {
    return INITIAL_STATE
}


export const collection = createReducer(INITIAL_STATE, {
    [Types.REQUEST_COLLECTION_LIST]: requestCollectionList,
    [Types.REQUEST_COLLECTION_LIST_SUCCESS]: requestCollectionListSuccess,
    [Types.CLEAR_COLLECTIONS]: clearCollections,
})

const getReducer = (rootState) => {
    return rootState.collection
}

export const getAllCollectionsIds = (rootState) => {
    const state = getReducer(rootState)
    return state.lists.allIds
}

export const getCollectionById = (rootState, id) => {
    const state = getReducer(rootState)
    return state.lists.byIds[id]
}




const getCollectionImage = (products) => {
    if(products.edges.length > 0 && products.edges[0].node.images.edges.length > 0){
        return products.edges[0].node.images.edges[0].node.originalSrc
    }else{
        return null
    }
    
}
export const getIsLoading = (rootState) => {
    const state = getReducer(rootState)
    return state.isFetching
}
//Normalize

const normalizeCollectionList = (graphQLCollection) => {
    const edges = graphQLCollection.data.shop.collections.edges

    const listsByIds = edges.map(edges => {
        const node = edges.node
        const id = node.id
        const handle = node.handle
        const title = node.title
        const image = getCollectionImage(node.products)

        return({
            [id]: {
                id: id,
                title: title,
                handle: handle,
                image: image
            }
        })
    }).reduce((acc,ele) => {
        const keys = Object.keys(ele)
        const key = keys[0]
        acc[key] = ele[key]
        return acc
    }, {});

    const listsAllIds = edges.map(edge => {
        const node = edge.node
        const id = node.id
        return id
    })
    return({
        lists: {
            byIds: listsByIds,
            allIds: listsAllIds
        }
    })
}