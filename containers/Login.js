import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestLogin(email, password))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default LoginContainer