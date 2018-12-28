import React from 'react';
import { StyledSafeAreaView} from '../components/Styled'
import { connect } from 'react-redux'
import  CollectionListContainer  from '../containers/CollectionList'
import SearchContainer from '../containers/Search'
import { theme }  from '../constants/Theme'

class Collection extends React.Component {
  constructor(props){
    super(props)
  }
  
  static navigationOptions = {
    headerTitle: <SearchContainer/>,
    headerStyle: {
      backgroundColor: theme.background,
    },
  };

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