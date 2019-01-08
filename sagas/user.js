import { UserProfileTypes } from '../redux/user'
import { CartTypes } from '../redux/cart'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createAddress, getCustomerAddress, associateUserToCheckout, createAccessToken, renewAccessToken, registerUser } from '../api'
import userActions from '../redux/user'
import { getAccessToken, getExpiryAt } from '../redux/user'
import { getId } from '../redux/cart'
import { AsyncStorage } from "react-native"
import { getConfig } from '../redux/config'




export function* requestRegister(action) {
    const { email, password } = action
    const user = {
        email,
        password
    }
    const config = select(getConfig)
    const response = yield call(registerUser, config, user)
    const payload = yield response.json()
    try {
        if (response.ok) {
            if (payload.data.customerCreate.customer) {
                yield put(userActions.requestRegisterSuccess())
            } else {
                yield put(userActions.requestRegisterFail(payload.data.customerCreate.customerUserErrors[0].message))
            }
        } else {
            yield put(userActions.requestRegisterFail())
        }
    } catch (e) {
        yield put(userActions.requestRegisterFail())
    }
}

export function* requestLogin(action) {
    const { email, password } = action
    const user = {
        email,
        password
    }
    const config = select(getConfig)
    const response = yield call(createAccessToken, config, user)
    const payload = yield response.json()
    if (response.ok) {
        if (payload.data.customerAccessTokenCreate.customerAccessToken) {
            yield put(userActions.requestLoginSuccess(payload.data.customerAccessTokenCreate.customerAccessToken))
            const accessToken = yield select(getAccessToken)
            const expiryAt = yield select(getExpiryAt)
            yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken)
            yield call([AsyncStorage, 'setItem'], 'expiryAt', expiryAt)
        } else {
            yield put(userActions.requestLoginFail(null))
        }

    } else {
        yield put(userActions.requestLoginFail())
    }
}

export function* requestRenewAccessToken(action) {


    const accessToken = action.accessToken
    const config = select(getConfig)
    const response = yield call(renewAccessToken, config, accessToken)
    const payload = yield response.json()
    if (response.ok) {
        yield put(userActions.requestLoginSuccess(payload.data.customerAccessTokenRenew.customerAccessToken))
        const accessToken = yield select(getAccessToken)
        const expiryAt = yield select(getExpiryAt)
        yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken)
        yield call([AsyncStorage, 'setItem'], 'expiryAt', expiryAt)
    } else {
        yield put(userActions.requestLoginFail(payload))
    }
}

export function* logout(action) {
    const keys = ['accessToken', 'expiryAt']
    yield call([AsyncStorage, 'multiRemove'], keys)
}

export function* requestAssociateUserToCheckout(action) {
    const accessToken = yield select(getAccessToken)
    const cartId = yield select(getId)
    const config = select(getConfig)
    try {
        const response = yield call(associateUserToCheckout, config, accessToken, cartId)
        const payload = yield response.json()
        if (response.ok) {
            yield put(userActions.requestAssociateUserToCheckoutSuccess())
        } else {
            yield put(userActions.requestAssociateUserToCheckoutFail())
        }
    } catch (e) {
        console.log(e)
    }
}
export function* requestUserAddress(action) {
    const accessToken = yield select(getAccessToken)
    const config = select(getConfig)
    try {
        const response = yield call(getCustomerAddress, config, accessToken)
        const payload = yield response.json()
        if (response.ok) {
            if (payload.data.customer.addresses.edges.length > 0) {
                yield put(userActions.requestUserAddressSuccess(payload))
            } else {
                yield put(userActions.requestUserAddressSuccessEmpty(payload))
            }

        } else {
            yield put(userActions.requestUserAddressFail())
        }
    } catch (e) {
        console.log(e)
    }
}
export function* requestCreateUserAddress(action) {
    const address = action.address
    const accessToken = yield select(getAccessToken)
    const config = select(getConfig)
    try {
        const response = yield call(createAddress, config, accessToken, address)
        const payload = yield response.json()

        if (response.ok) {
            if (payload.data.customerAddressCreate.customerAddress) {
                yield put(userActions.requestCreateUserAddressSuccess())
            } else {
                yield put(userActions.requestCreateUserAddressFail(payload.data.customerAddressCreate.customerUserErrors[0].message))
            }

        } else {
            yield put(userActions.requestCreateUserAddressFail('Please try again'))
        }
    } catch (e) {
        console.log(e)
    }
}

export const userSaga = [
    takeLatest(UserProfileTypes.REQUEST_LOGIN, requestLogin),
    takeLatest(UserProfileTypes.REQUEST_LOGIN_SUCCESS, requestAssociateUserToCheckout),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT_SUCCESS, requestAssociateUserToCheckout),
    takeLatest(UserProfileTypes.REQUEST_REGISTER, requestRegister),
    takeLatest(UserProfileTypes.REQUEST_RENEW_ACCESS_TOKEN, requestRenewAccessToken),
    takeLatest(UserProfileTypes.LOGOUT, logout),
    takeLatest(UserProfileTypes.REQUEST_CREATE_USER_ADDRESS, requestCreateUserAddress),
    takeLatest(UserProfileTypes.REQUEST_USER_ADDRESS, requestUserAddress),
    takeLatest(UserProfileTypes.REQUEST_LOGIN_SUCCESS, requestUserAddress),
    takeLatest(UserProfileTypes.SET_ACCESS_TOKEN, requestUserAddress),
    takeLatest(UserProfileTypes.REQUEST_CREATE_USER_ADDRESS_SUCCESS, requestUserAddress),
]
