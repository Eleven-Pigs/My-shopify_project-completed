import React from 'react';

import { connect } from 'react-redux'
import { SafeAreaView, View, TextInput, Text } from 'react-native';
import { getHeaderBackgroundColor, getColorSelectionList, getPrimaryColor } from '../redux/config';
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
  constructor(props){
    super(props)
    this.state={
      textHexColor: ''
    }
  }


  componentDidMount(){
    this.props.navigation.setParams({ color: this.props.headerBackroundColor, title: this.props.shopName });
    this.setState({
      textHexColor: this.props.primaryColor.substring(1,7)
    })
  }
  onChangeText = (text) => {
    if(text.length <= 6){
      this.setState({textHexColor: text})
    }
    if(text.length === 6){
      this.props.setPrimaryColor(`#${text}`)
    }
  }
  changeColor = (color) => {
    this.setState({
      textHexColor: color.substring(1,7)
    })
    this.props.setPrimaryColor(color)
  }


  render() {
    return (
      <SafeAreaView style = {{flex:1}}>
        <View style = {{flex:1, paddingTop: 20}}>
         <View style = {{paddingLeft: 30, paddingRight: 30, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style = {{fontSize: 30, textAlign: 'right'}}>#</Text>
          <TextInput
              style={{fontSize: 30, borderColor: 'gray'}}
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.textHexColor}
            />
          </View>
         <ColorPalette
            onChange={(color) => { this.changeColor(color)}}
            value={this.props.primaryColor}
            colors={this.props.colorSelectionList}
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
    primaryColor: getPrimaryColor(state),
    colorSelectionList: getColorSelectionList(state)
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