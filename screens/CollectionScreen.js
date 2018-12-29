import React from 'react';
import { StyledSafeAreaView} from '../components/Styled'
import { connect } from 'react-redux'
import  CollectionListContainer  from '../containers/CollectionList'
import SearchContainer from '../containers/Search'
import CollectionPlaceholder from '../components/Placeholder/CollectionPlaceholder'
import { getIsLoading } from '../redux/collection'
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
     
      width: '100%',
    },
  });

  _renderContent = (isLoading) => {
    if(isLoading){
      return <CollectionPlaceholder/>
    }else{
      return <CollectionListContainer/>
    }
  }

  render = () => {
    return (
        <StyledSafeAreaView >
          {this._renderContent(this.props.isLoading)}
        </StyledSafeAreaView>
    )
  }

}

const mapStateToProps = state => {
  return {
    isLoading: getIsLoading(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {}
}

const CollectionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection)


export default CollectionScreen