import React from 'react';

import { connect } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { getHeaderBackgroundColor } from '../redux/config';
import ColorPalette from 'react-native-color-palette'
import { Icon } from 'expo'
import ConfigActions from '../redux/config'

class ChangeColor extends React.Component {
  static navigationOptions =( { navigation } ) => {
    return(
      {
        headerTitle: 'Change Color',
        headerStyle: {
          backgroundColor:navigation.state.params ? navigation.state.params.color : 'white'
        },
      }
    )
  }


  componentDidMount(){
    this.props.navigation.setParams({ color: this.props.headerBackroundColor, title: this.props.shopName });
  }
  

  render() {
    return (
      <SafeAreaView style = {{flex:1}}>
        <View style = {{flex:1}}>
         <ColorPalette
            onChange={(color) => {this.props.setPrimaryColor(color)}}
            value={'#C0392B'}
            colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
            title={""}
            icon={
              <Icon.MaterialCommunityIcons name={'check-circle-outline'} size={25} color={'black'} />
              // React-Native-Vector-Icons Example
            }
          />
        </View>
      </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
    headerBackroundColor: getHeaderBackgroundColor(state),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setPrimaryColor: (color) => {
      dispatch(ConfigActions.setPrimaryColor(color))
    }
  }
}

const ChangeColorScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeColor)

export default ChangeColorScreen