import React from 'react';

import { connect } from 'react-redux'
import { HomeComponent } from '../components/Home'
import { getText } from '../redux/user'
class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
      <HomeComponent handleProductClick={this.handleProductClick} handleCollectionClick={this.handleCollectionClick} />
    );
  }

}

const mapStateToProps = state => {
  return {
    text: getText(state)
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