import { UserProfileTypes } from '../redux/user'
import { takeLatest, call, select } from 'redux-saga/effects';
import { addProductToCheckout } from '../api'
import { getText } from '../redux/user'

export function* helloWorld(action) {
    const product = {
        variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==",
        quantity: 1
    }
    const cartId = "Z2lkOi8vc2hvcGlmeS9DaGVja291dC82NzYwZDE0ZmNkZDc5YWU2NWVmMWY1MTFjMTk0N2U0MD9rZXk9MjdkZDVhYTI0ZDg2MmJjYTdiOGQyZDE3ZmE3MGFlZWE="
    const response = yield call(addProductToCheckout, product, cartId)
    if(response.ok){
        console.log(response)
    }else{
        console.log("not okay")
    }
}
export const userSaga = [
    takeLatest(UserProfileTypes.HELLO_WORLD, helloWorld)
]
