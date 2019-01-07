import { connect } from 'react-redux'
import { HomeCategories } from '../components/HomeCategories'
import { getAllCollectionsIds } from '../redux/collection'

const mapStateToProps = (state) => {
  return {
    collectionIds: getAllCollectionsIds(state)
  }
}

const HomeCategoriesContainer = connect(
  mapStateToProps
)(HomeCategories)

export default HomeCategoriesContainer