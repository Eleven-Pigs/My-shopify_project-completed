import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import  CollectionListContainer  from '../containers/CollectionList'
class Collection extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
   header: null,
  };

  render = () => {
    return (
        <SafeAreaView>
            <CollectionListContainer/>
        </SafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {}
}


const mapDispatchToProps = dispatch => {
  return {}
}

const CollectionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection)


export default CollectionScreen