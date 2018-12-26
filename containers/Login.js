import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default LoginContainer