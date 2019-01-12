import React from 'react';

import { connect } from 'react-redux'
import { HomeComponent } from '../components/Home'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { getName, getShopUrl, getFinishLoad} from '../redux/shop'
import HomeCategoriesContainer from '../containers/HomeCategories'
import BestSellingProductsContainer from '../containers/BestSellingProducts'
import LatestProductsContainer from '../containers/LatestProducts'
import { theme } from '../constants/Theme';
import HomePlaceholder from '../components/Placeholder/HomePlaceholder';
import { getHeaderBackgroundColor } from '../redux/config';

class Home extends React.Component {
  static navigationOptions =( { navigation } ) => {
    return(
      {
        headerTitle: navigation.state.params ? navigation.state.params.title : '',
        headerStyle: {
          backgroundColor:navigation.state.params ? navigation.state.params.color : 'white'
        },
      }
    )
  }

  componentDidMount(){
    this.props.navigation.setParams({ color: this.props.headerBackroundColor, title: this.props.shopName });
  }

  renderHomePage = (finishLoad) => {
    if(finishLoad){
      return (
        <ScrollView style = {{backgroundColor: theme.listBackground}}>
          <HomeCategoriesContainer/>
          <BestSellingProductsContainer/>
          <LatestProductsContainer/>
      </ScrollView>
      )
    }else{
      return (<HomePlaceholder/>)
    }

  }

  handleProductClick = (handle) => {
    this.props.navigation.navigate('ProductDetailScreen', {
      handle: handle
    })
  }
  handleCollectionClick = (handle) => {
    this.props.navigation.navigate('ProductListScreen', {
      handle: handle
    })
}

  render() {
    return (
      
       <HomeComponent handleProductClick={this.handleProductClick} handleCollectionClick={this.handleCollectionClick} shopUrl = {this.props.shopUrl}/>
      
    );
  }

}

const mapStateToProps = state => {
  return {
    shopName: getName(state),
    shopUrl: getShopUrl(state),
    finishLoad: getFinishLoad(state),
    headerBackroundColor: getHeaderBackgroundColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeScreen