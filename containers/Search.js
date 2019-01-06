
import { connect } from 'react-redux'
import  SearchBox  from '../components/Search'
import { getPrimaryColor } from '../redux/config';



const mapStateToProps = (state, ownProps) => {
  return {
    defaultValue: ownProps.defaultValue,
    primaryColor: getPrimaryColor(state)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onPressSearch: (text) => { ownProps.searchPressed(text) }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)

export default SearchContainer




