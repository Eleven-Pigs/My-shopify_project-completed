import React from 'react';
import { StyledSafeAreaView } from '../components/Styled'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
import ProductListContainer  from '../containers/ProductList'
import SearchContainer from '../containers/Search'
import { getEndOfProduct, getIsLoading, getProductCount } from '../redux/productList'
import { theme } from '../constants/Theme'
import ProductListPlaceholder from '../components/Placeholder/ProductListPlaceholder'
import  FilterTab  from '../components/FilterTab';
import { getPrimaryColor, getHeaderBackgroundColor, getHeaderBackIconColor } from '../redux/config'
import HeaderBackButton  from '../containers/HeaderBackButton'

class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      mode: 'id',
      handle: null,
      search: null,
      sortKey: null,
      reverse: false
    }
  }


  static navigationOptions =  ({navigation}) => { 
    return ({
    headerTitle: <SearchContainer afterCancel={navigation.state.params.afterCancel} beforeFocusSearch={navigation.state.params.beforeFocus} defaultValue={navigation.state.params.query} searchPressed={navigation.state.params.searchPressed}/>,
    headerLeft: navigation.state.params.hideBackButton ? null  : <HeaderBackButton /> ,
  })};

  componentDidMount(){
    this.props.navigation.setParams({ searchPressed: this.searchPressed, beforeFocus: this.beforeFocus, hideBackButton: false, afterCancel: this.afterCancel });
    const id = this.props.navigation.getParam('id'); 
    if (id){
      this.setState({id: id, mode: 'ID'})
      this.props.requestProductListFromCollection(id, this.state.sortKey, this.state.reverse)
    }else{
      const handle = this.props.navigation.getParam('handle');
      if(handle){
        this.setState({handle: handle, mode: 'HANDLE'})
        this.props.requestProductListFromCollectionByHandle(handle, this.state.sortKey, this.state.reverse)
      }else{
        const query = this.props.navigation.getParam('query');
        this.setState({search: query, mode: 'SEARCH'})
        this.props.navigation.setParams({ defaultValue: query });
        if(query.length > 0){
          this.props.requestProductListBySearch(query, this.state.sortKey, this.state.reverse)
        }
      }
    }
  }

  componentWillUnmount(){
    this.props.clearProductList()
  }

  beforeFocus = () => {
    this.props.navigation.setParams({ hideBackButton: true });
  }
  afterCancel = () => {
    this.props.navigation.setParams({ hideBackButton: false });
  }

  searchPressed = (text) => {
    this.props.navigation.setParams({ hideBackButton: true });
    if(text != ''){
      this.setState({search: text, mode: 'SEARCH'})
      this.props.clearProductList()
      this.props.requestProductListBySearch(text, this.state.sortKey, this.state.reverse)
    }

  }

  loadMore = () => {
    if(this.state.mode === 'ID'){
      this.props.requestProductListFromCollection(this.state.id, this.state.sortKey, this.state.reverse)
    }else if(this.state.mode === 'HANDLE'){
      this.props.requestProductListFromCollectionByHandle(this.state.handle, this.state.sortKey, this.state.reverse)
    }else{
      this.props.requestProductListBySearch(this.state.search, this.state.sortKey, this.state.reverse)
    }
  }
  renderEmptyList = () => {
    return(
        <View style = {{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Text>No product found.</Text>
        </View>
    )
} 


  _renderContent = (isLoading, productCount) => {
    if(isLoading && productCount === 0){
      return <ProductListPlaceholder/>
    }else if (!isLoading && productCount === 0){
      //return empty
      return this.renderEmptyList()
    }else{
      return <ProductListContainer endReached={this.loadMore}/>
    }
  }
  sortProduct = (id, sort, reverse) => {
    if(this.state.mode === 'ID'){
      this.props.requestProductListFromCollection(id, sort, reverse)
    }else if(this.state.mode === 'HANDLE'){
      this.props.requestProductListFromCollectionByHandle(id, sort, reverse)
    }else{
      this.props.requestProductListBySearch(id, sort, reverse)
    }
  }

  sortPressed = (sort) => {
    this.props.clearProductList()
    switch (sort.value){
      case 1:
        //Featured does not have an api
        
        break;
      case 2:
        //Best Selling  
        this.sortProduct(this.state.id, 'BEST_SELLING', false)
        
        this.setState({sortKey: 'BEST_SELLING', reverse: false})
        break;
      case 3:
        //Alphabetically, A - Z 
        this.sortProduct(this.state.id, 'TITLE', false)
        this.setState({sortKey: 'TITLE', reverse: false})
        break;
      case 4:
        //Alphabetically, Z - A 
        this.sortProduct(this.state.id, 'TITLE', true)
        this.setState({sortKey: 'TITLE', reverse: true})
        break;
      case 5:
        this.sortProduct(this.state.id, 'PRICE', false)
        this.setState({sortKey: 'PRICE', reverse: false})
        //Price, low to high
        break;
      case 6:
        this.sortProduct(this.state.id, 'PRICE', true)
        this.setState({sortKey: 'PRICE', reverse: true})
        //Price, high to low
        break;
      case 7:
        //Date, new to old
        this.sortProduct(this.state.id, 'CREATED', false)
        this.setState({sortKey: 'CREATED', reverse: false})
        break;
      case 8:
        //Date, old to new
        this.sortProduct(this.state.id, 'CREATED', true)
        this.setState({sortKey: 'CREATED', reverse: true})
        break;
    }
    
  
  }

  render = () => {
    return (
        <StyledSafeAreaView>
          <View>
            {this._renderContent(this.props.isLoading, this.props.productCount)}
            <FilterTab sortPressed={this.sortPressed} primaryColor= {this.props.primaryColor}/>
          </View>
        </StyledSafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    endOfProduct: getEndOfProduct(state),
    isLoading: getIsLoading(state),
    productCount: getProductCount(state),
    primaryColor: getPrimaryColor(state),
    headerBackgroundColor: getHeaderBackgroundColor(state),
    headerIconColor: getHeaderBackIconColor(state),
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductListFromCollection: (id, sortKey, reverse) => {
      dispatch(ProductListActions.requestProductListFromCollection(id, sortKey, reverse))
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