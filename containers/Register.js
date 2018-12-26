import { connect } from 'react-redux'
import { RegisterComponent } from '../components/Register'
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent)

export default RegisterContainer