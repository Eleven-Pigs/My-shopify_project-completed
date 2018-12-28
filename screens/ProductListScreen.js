import React from 'react';
import { StyledSafeAreaView } from '../components/Styled'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
import ProductListContainer  from '../containers/ProductList'
import SearchContainer from '../containers/Search'
import { getEndOfProduct } from '../redux/productList'

class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    this.setState({id: id})
    if (id){
      this.props.requestProductListFromCollection(id)
    }else{
      const handle = this.props.navigation.getParam('handle');
      this.props.requestProductListFromCollectionByHandle(handle)
    }
  }
  loadMore = () => {
     this.props.requestProductListFromCollection(this.state.id, this.state.cursor)
  }

  

  render = () => {
    return (
        <StyledSafeAreaView>
          <SearchContainer/>
          <ProductListContainer endReached = {this.loadMore}/>
        </StyledSafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    endOfProduct: getEndOfProduct(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductListFromCollection: (id, cursor) => {
      dispatch(ProductListActions.requestProductListFromCollection(id, cursor))
    },
    requestProductListFromCollectionByHandle: (handle, cursor) => {
      dispatch(ProductListActions.requestProductListFromCollectionByHandle(handle, cursor))
    },
  }
}

const ProductListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)


export default ProductListScreen