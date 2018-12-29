import React from 'react';
import { StyledSafeAreaView} from '../components/Styled'
import { connect } from 'react-redux'
import  CollectionListContainer  from '../containers/CollectionList'
import SearchContainer from '../containers/Search'
import { theme }  from '../constants/Theme'

class Collection extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      mode: 'id',
      handle: null,
      search: null,
    }
  }


  static navigationOptions =  ({navigation}) => ({
    headerTitle: <SearchContainer defaultValue="" searchPressed={(text) => {navigation.navigate("ProductListScreen",{query: text})}}/>,
    headerStyle: {
      backgroundColor: theme.background,
      width: '100%',
    },
  });


  render = () => {
    return (
        <StyledSafeAreaView >
          <CollectionListContainer/>
        </StyledSafeAreaView>
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