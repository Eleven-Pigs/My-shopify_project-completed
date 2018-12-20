import React from 'react';
import { connect } from 'react-redux'
import { getCollectionById, getProductCursor} from '../redux/collection'
import { CollectionItem as Item}  from '../components/CollectionItem'
import { withNavigation } from 'react-navigation';

class CollectionItem extends React.Component {
  navigateToProductDetail = () => {
    const handle = this.props.collection.handle
     this.props.navigation.navigate('ProductDetailScreen',{
       productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2OTA5MTUzNDAzNTI='
     })
  }

  render() {
    return (
        <Item collection={this.props.collection} onPressItem={this.navigateToProductDetail} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    collection: getCollectionById(state, ownProps.id),
  }
}

const CollectionItemContainer = connect(
  mapStateToProps
)(CollectionItem)

export default withNavigation(CollectionItemContainer)