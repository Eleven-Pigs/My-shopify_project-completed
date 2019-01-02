import { connect } from 'react-redux'
import { getAllVariantsId, getSelectedVariantImage, getVariantPrice, getSelectedCount, getTitle  } from '../redux/productDetail'
import  VariantModal from '../components/VariantModal'
import ProductDetailActions from '../redux/productDetail'

const mapStateToProps = (state, ownProps) => {
  return {
    variants: getAllVariantsId(state),
    selectedVariantImage: getSelectedVariantImage(state),
    title: getTitle(state),
    selectedVariantPrice: getVariantPrice(state),
    selectedCount: getSelectedCount(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddPressed: () => {
      dispatch(ProductDetailActions.addCount())
    },
    onMinusPressed: () => {
      dispatch(ProductDetailActions.minusCount())
    }
  }
}

const VariantModalItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantModal)

export default VariantModalItemContainer