import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cursor: null
    }
  }
  static navigationOptions = {
   header: null,
  };

  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    this.props.requestProductListFromCollection(id, this.state.cursor)
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
    requestProductListFromCollection: (id, cursor) => {
      dispatch(ProductListActions.requestProductListFromCollection(id, cursor))
    },
  }
}

const ProductListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)


export default ProductListScreen