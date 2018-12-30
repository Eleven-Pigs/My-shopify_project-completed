import React from 'react';
import { StyledSafeAreaView } from '../components/Styled'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
import ProductListContainer  from '../containers/ProductList'
import SearchContainer from '../containers/Search'
import { getEndOfProduct, getIsLoading, getProductCount } from '../redux/productList'
import { theme } from '../constants/Theme'
import ProductListPlaceholder from '../components/Placeholder/ProductListPlaceholder'
import { FilterTab } from '../components/FilterTab';

class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      mode: 'id',
      handle: null,
      search: null,
    }
  }


  static navigationOptions =  ({navigation}) => { 
    return ({
    headerTitle: <SearchContainer defaultValue={navigation.state.params.query} searchPressed={navigation.state.params.searchPressed}/>,
    headerStyle: {
      backgroundColor: 'white',
      width: '120%',
    },
  })};

  componentDidMount(){
    this.props.navigation.setParams({ searchPressed: this.searchPressed });

    const id = this.props.navigation.getParam('id'); 
    if (id){
      this.setState({id: id, mode: 'ID'})
      this.props.requestProductListFromCollection(id)
    }else{
      const handle = this.props.navigation.getParam('handle');
      if(handle){
        this.setState({handle: handle, mode: 'HANDLE'})
        this.props.requestProductListFromCollectionByHandle(handle)
      }else{
        const query = this.props.navigation.getParam('query');
        this.setState({search: query, mode: 'SEARCH'})
        this.props.navigation.setParams({ defaultValue: query });
        this.props.requestProductListBySearch(query)
      }
    }
  }

  componentWillUnmount(){
    this.props.clearProductList()
  }

  searchPressed = (text) => {
    this.setState({search: text, mode: 'SEARCH'})
    this.props.clearProductList()
    this.props.requestProductListBySearch(text)
  }

  loadMore = () => {
    if(this.state.mode === 'ID'){
      this.props.requestProductListFromCollection(this.state.id)
    }else if(this.state.mode === 'HANDLE'){
      this.props.requestProductListFromCollectionByHandle(this.state.handle)
    }else{
      this.props.requestProductListBySearch(this.state.search)
    }
  }


  _renderContent = (isLoading, productCount) => {
    if(isLoading && productCount === 0){
      return <ProductListPlaceholder/>
    }else if (!isLoading && productCount === 0){
      //return empty
      <ProductListContainer />
    }else{
      return <ProductListContainer endReached={this.loadMore}/>
    }
  }

  sortPressed = () => {
    alert('sort')
  }

  filterPressed = () => {
    alert('filter')
  }
  render = () => {
    return (
        <StyledSafeAreaView>
            <View style = {{marginBottom: 40}}>
              {this._renderContent(this.props.isLoading, this.props.productCount)}
            </View>
            <FilterTab sortPressed={this.sortPressed} filterPressed={this.filterPressed}/>
        </StyledSafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    endOfProduct: getEndOfProduct(state),
    isLoading: getIsLoading(state),
    productCount: getProductCount(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductListFromCollection: (id) => {
      dispatch(ProductListActions.requestProductListFromCollection(id))
    },
    requestProductListFromCollectionByHandle: (handle) => {
      dispatch(ProductListActions.requestProductListFromCollectionByHandle(handle))
    },
    clearProductList: () => {
      dispatch(ProductListActions.clearProductList())
    },
    requestProductListBySearch: (search) => {
      dispatch(ProductListActions.requestProductListBySearch(search))
    },
  }
}

const ProductListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)


export default ProductListScreen