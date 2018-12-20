import React from 'react';
import { View } from 'react-native'

import { connect } from 'react-redux'

class Collection extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   header: null,
  };

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render = () => {
    return (
        <View style = {{flex:1}}>

        </View>
    )
  }

}

const mapStateToProps = state => {
  return {}
}


const mapDispatchToProps = dispatch => {
  return {
  }
}

const CollectionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection)


export default CollectionScreen