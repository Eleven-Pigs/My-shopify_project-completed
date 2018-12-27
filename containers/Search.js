
import { connect } from 'react-redux'
import  SearchBox  from '../components/Search'

const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    onPressSearch: (text) => {console.log(text)}
  }
}


const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)

export default SearchContainer




