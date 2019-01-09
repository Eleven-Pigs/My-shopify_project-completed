import { connect } from 'react-redux'
import RegisterComponent from '../components/Register'
import UserActions from '../redux/user'
import { getFetchingRegister, getErrorText, getFetchingRegisterError, resetRegister } from '../redux/user'
import { getName } from '../redux/shop'
import { getButtonBackgroundColor, getButtonTextColor } from '../redux/config';
const mapStateToProps = state => {
  return {
    shopName: getName(state),
    isRequestingRegister: getFetchingRegister(state),
    errorText: getErrorText(state),
    isRegisterError: getFetchingRegisterError(state),
    buttonBackgroundColor: getButtonBackgroundColor(state),
    buttonTextColor: getButtonTextColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestRegister(email, password))
    },
    registerErrorShown: () => {
      dispatch(UserActions.registerErrorShown())
    },
    resetRegister: () => {
      dispatch(UserActions.resetRegister())
    }
    
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent)

export default RegisterContainer