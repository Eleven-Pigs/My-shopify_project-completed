
import { connect } from 'react-redux'
import  SearchBox  from '../components/Search'
import { getGeneralIconColor } from '../redux/config';



const mapStateToProps = (state, ownProps) => {
  return {
    defaultValue: ownProps.defaultValue,
    iconColor: getGeneralIconColor(state)
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




