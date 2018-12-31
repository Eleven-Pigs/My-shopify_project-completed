import React from 'react';
import { StyledSafeAreaView } from '../components/Styled'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ProductListActions  from '../redux/productList'
import ProductListContainer  from '../containers/ProductList'
import SearchContainer from '../containers/Search'
import { getEndOfProduct, getIsLoading, getProductCount } from '../redux/productList'
import { theme } from '../constants/Theme'
import ProductListPlaceholder from '../components/Placeholder/ProductListPlaceholder'
import  FilterTab  from '../components/FilterTab';

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
    headerTitle: <SearchContainer defaultValue={navigation.state.params.query} searchPressed={navigation.state.params.searchPressed}/>,
    headerStyle: {
      backgroundColor: theme.background,
      width: '100%',
    },
  })};

  componentDidMount(){
    this.props.navigation.setParams({ searchPressed: this.searchPressed });

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
        this.props.requestProductListBySearch(query, this.state.sortKey, this.state.reverse)
      }
    }
  }

  componentWillUnmount(){
    this.props.clearProductList()
  }

  searchPressed = (text) => {
    this.setState({search: text, mode: 'SEARCH'})
    this.props.clearProductList()
    this.props.requestProductListBySearch(text, this.state.sortKey, this.state.reverse)
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

  sortPressed = (sort) => {
    this.props.clearProductList()
    switch (sort.value){
      case 1:
        //Featured does not have an api
        
        break;
      case 2:
        //Best Selling  
        this.props.requestProductListFromCollection(this.state.id, 'BEST_SELLING', false)
        this.setState({sortKey: 'BEST_SELLING', reverse: false})
        break;
      case 3:
        //Alphabetically, A - Z 
        this.props.requestProductListFromCollection(this.state.id, 'TITLE', false)
        this.setState({sortKey: 'TITLE', reverse: false})
        break;
      case 4:
        //Alphabetically, Z - A 
        this.props.requestProductListFromCollection(this.state.id, 'TITLE', true)
        this.setState({sortKey: 'TITLE', reverse: true})
        break;
      case 5:
        this.props.requestProductListFromCollection(this.state.id, 'PRICE', false)
        this.setState({sortKey: 'PRICE', reverse: false})
        //Price, low to high
        break;
      case 6:
        this.props.requestProductListFromCollection(this.state.id, 'PRICE', true)
        this.setState({sortKey: 'PRICE', reverse: true})
        //Price, high to low
        break;
      case 7:
        //Date, new to old
        this.props.requestProductListFromCollection(this.state.id, 'CREATED', false)
        this.setState({sortKey: 'CREATED', reverse: false})
        break;
      case 8:
        //Date, old to new
        this.props.requestProductListFromCollection(this.state.id, 'CREATED', true)
        this.setState({sortKey: 'CREATED', reverse: true})
        break;
    }
    
  
  }

  render = () => {
    return (
        <StyledSafeAreaView>
          <View>
            {this._renderContent(this.props.isLoading, this.props.productCount)}
            <FilterTab sortPressed={this.sortPressed}/>
          </View>
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