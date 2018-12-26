import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    requestLogin: ['email','password'],
  })

export const UserProfileTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    isFetching: false,
})

const requestLogin = (state, action) => {
    return state.merge({
        text: true,
    })
}

export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: requestLogin,
})

const getReducer = (rootState) => {
    return rootState.user
}

export const getText = (rootState) => {
    const state = getReducer(rootState)

    return state.text
}

