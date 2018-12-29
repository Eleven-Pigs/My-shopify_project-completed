import React from 'react'
import {View, Text} from 'react-native'
import Placeholder from 'rn-placeholder'
import { theme } from '../../constants/Theme'

const Title = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "100%", height:20, marginTop: 5,    borderRadius:10}}>
      
    </View>
  )
}
const TitlePlaceholder = Placeholder.connect(Title);

const SubTitle = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "60%", height:20, marginTop: 5, borderRadius:10, alignSelf: 'center'}}>
      
    </View>
  )
}
const SubTitlePlaceholder = Placeholder.connect(SubTitle);

const ProductListContent = () => {
  return (
    <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>

    <View style = {{flex:1, padding: 5}}>
        <View style = {{paddingLeft: 5, paddingRight: 5, height: 200, backgroundColor: 'white', justifyContent: 'center',borderRadius: 5,}}>
          <TitlePlaceholder animate="fade"/>
          <SubTitlePlaceholder animate="fade" />
      </View>
    </View>

    <View style = {{flex:1, padding: 5}}>
        <View style = {{paddingLeft: 5, paddingRight: 5, height: 200, backgroundColor: 'white', justifyContent: 'center',borderRadius: 5,}}>
          <TitlePlaceholder animate="fade"/>
          <SubTitlePlaceholder animate="fade" />
        </View>
    </View>
    
  </View>  
  )
}

const ProductListPlaceholder = (props) => {
  return (
    <View style = {{ backgroundColor: theme.listBackground, height: '100%'}}>
      <ProductListContent/>
      <ProductListContent/>
      <ProductListContent/>
    </View>

  )
}
export default  ProductListPlaceholder;


 
