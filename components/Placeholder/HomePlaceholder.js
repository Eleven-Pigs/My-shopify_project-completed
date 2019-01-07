import React from "react";
import {View, Text} from 'react-native'
import { Main } from '../Styled'
import Placeholder from "rn-placeholder";
import { theme } from "../../constants/Theme";

const CollectionItem = props => {
  const style = { backgroundColor: '#e3e3e3', width: "100%", height: '100%'};
  return ( 
    <View style={style}/>
  )
};
CollectionItemPlaceholder = Placeholder.connect(CollectionItem);

const CollectionContainer = props => {
  return (
        <View style = {{width: "100%", flexDirection: 'row'}}>
            <View style = {{backgroundColor: 'white',width: 200,height:200, marginLeft: 10, padding: 5}}>
              <CollectionItemPlaceholder animate="fade"/>
            </View>
            <View style = {{backgroundColor: 'white',width: 200,height:200, marginLeft: 10, padding: 5}}>
              <CollectionItemPlaceholder animate="fade"/>
              </View>
        </View>

  );
};

const Image = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "100%", height:200}}>
      
    </View>
  )
}
const ImagePlaceholder = Placeholder.connect(Image);

const Title = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "100%", height:12, marginTop: 5,    borderRadius:10}}>
      
    </View>
  )
}
const TitlePlaceholder = Placeholder.connect(Title);

const SubTitle = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "60%", height:12, marginTop: 5, borderRadius:10}}>
      
    </View>
  )
}
const SubTitlePlaceholder = Placeholder.connect(SubTitle);

const Price = (props) => {
  return (
    <View style={{backgroundColor:'#e3e3e3', width: "40%", height:12, marginTop: 5, marginBottom: 5, borderRadius:10}}>
      
    </View>
  )
}
const PricePlaceholder = Placeholder.connect(Price);

const ProductListContent = () => {
  return (
    <View style = {{flexDirection: 'row', flexWrap: 'wrap', left: 150, marginTop: 25}}>

    <View style = {{flex:1, padding: 5}}>
      <View style = {{backgroundColor: 'white'}}>
        <View style = {{padding:5}}>
          <ImagePlaceholder animate="fade" />
        </View>
        <View style = {{paddingLeft: 5, paddingRight: 5}}>
          <TitlePlaceholder animate="fade"/>
          <SubTitlePlaceholder animate="fade"/>
          <PricePlaceholder animate="fade"/>
        </View>
      </View>
    </View>

    <View style = {{flex:1, padding: 5}}>
      <View style = {{backgroundColor: 'white'}}>
        <View style = {{padding:5}}>
          <ImagePlaceholder animate="fade" />
        </View>
        <View style = {{paddingLeft: 5, paddingRight: 5}}>
          <TitlePlaceholder animate="fade"/>
          <SubTitlePlaceholder animate="fade"/>
          <PricePlaceholder animate="fade"/>
        </View>
      </View>
    </View>
    
  </View>  
  )
}

export default customPlaceholder = props => {
  return (
      <View style = {{paddingTop: 10, backgroundColor: theme.listBackground}}>
         <CollectionContainer />
         <ProductListContent  />
         <ProductListContent  />
      </View>

  );
};
