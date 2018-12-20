import React from 'react';
import { connect } from 'react-redux'
import { getCollectionById } from '../redux/collection'
import { CollectionItem } from '../components/CollectionItem'
import { withNavigation } from 'react-navigation';

class Collection extends React.Component {
  navigateToProductDetail = () => {
    this.props.navigation.navigate('ProductDetailScreen',{
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2OTA5MTUzNDAzNTI='
    })
  }

  render() {
    return (
        <CollectionItem collection={this.props.collection} onPressItem={this.navigateToProductDetail} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    collection: getCollectionById(state, ownProps.id)
  }
}

const CollectionItemContainer = connect(
  mapStateToProps
)(Collection)

export default withNavigation(CollectionItemContainer)