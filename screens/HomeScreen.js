import React from 'react';

import { connect } from 'react-redux'
import { HomeComponent } from '../components/Home'
import { SafeAreaView } from 'react-native';
import { getName } from '../redux/shop'
import {getShopUrl} from '../redux/shop'


class Home extends React.Component {
  static navigationOptions =( { navigation } ) => {
    return(
      {
        headerTitle: navigation.state.params ? navigation.state.params.title : '',
      }
    )
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
  componentDidMount(){
    this.props.navigation.setParams({ title: this.props.shopName })
  }

  render() {
    return (
      <SafeAreaView style = {{flex:1}}>
        <HomeComponent shopUrl={this.props.shopUrl} handleProductClick={this.handleProductClick} handleCollectionClick={this.handleCollectionClick} />
      </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
    shopName: getName(state),
    shopUrl: getShopUrl(state)
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