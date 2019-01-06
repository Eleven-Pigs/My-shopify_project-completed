import { connect } from 'react-redux'
import { getVariantById, getIsSelected  } from '../redux/productDetail'
import  VariantModalItem  from '../components/VariantModalItem'
import ProductDetailActions from '../redux/productDetail'
import { getPrimaryColor } from '../redux/config'

const mapStateToProps = (state, ownProps) => {
  return {
    variant: getVariantById(state, ownProps.id),
    isSelected: getIsSelected(state, ownProps.id),
    primaryColor: getPrimaryColor(state),
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onItemPress: () => {
      dispatch(ProductDetailActions.setSelectedVariant(ownProps.id))
    }
  }
}

const VariantModalItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantModalItem)

export default VariantModalItemContainer