import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
class ProductList extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   header: null,
  };

  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    this.props.requestProductListFromCollection(id)
  }

  

  render = () => {
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {}
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductListFromCollection: (id) => {
      dispatch(ProductListActions.requestProductListFromCollection(id))
    },
  }
}

const ProductListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)


export default ProductListScreen