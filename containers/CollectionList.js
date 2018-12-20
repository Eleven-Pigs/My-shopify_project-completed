import { connect } from 'react-redux'
import { CollectionList } from '../components/CollectionList'
import { getAllCollectionsIds } from '../redux/collection'

const mapStateToProps = (state, ownProps) => {
  return {
    collectionIds: getAllCollectionsIds(state)
  }
}

const CollectionListContainer = connect(
  mapStateToProps
)(CollectionList)

export default CollectionListContainer