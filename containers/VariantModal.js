import { connect } from 'react-redux'
import { getAllVariantsId, getSelectedVariantImage, getVariantPrice, getSelectedCount, getTitle  } from '../redux/productDetail'
import  VariantModal from '../components/VariantModal'
import ProductDetailActions from '../redux/productDetail'
import { getModalHeaderColor } from '../redux/config'
import { getModalHeaderContentColor } from '../redux/config'
const mapStateToProps = (state, ownProps) => {
  return {
    variants: getAllVariantsId(state),
    selectedVariantImage: getSelectedVariantImage(state),
    title: getTitle(state),
    selectedVariantPrice: getVariantPrice(state),
    selectedCount: getSelectedCount(state),
    modalHeaderColor: getModalHeaderColor(state),
    modalHeaderContentColor: getModalHeaderContentColor(state),
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