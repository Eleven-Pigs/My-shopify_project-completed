import { connect } from 'react-redux'
import RegisterComponent from '../components/Register'
import UserActions from '../redux/user'
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestRegister(email, password))
    }
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent)

export default RegisterContainer