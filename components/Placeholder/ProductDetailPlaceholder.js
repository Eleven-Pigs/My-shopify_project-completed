import React from "react";
import {View, Text} from 'react-native'
import { Main } from '../Styled'
import Placeholder from "rn-placeholder";
import { theme } from "../../constants/Theme";

const Banner = props => {
  const style = { backgroundColor: '#e3e3e3', width: "100%", height:500};
  return (
      <View>
        <View style={style}>
      
        </View>
      </View>

  );
};
BannerPlaceholder = Placeholder.connect(Banner);

const Title = props => {
  const style = { backgroundColor: '#e3e3e3', width: "30%", height:15, borderRadius: 5};
  return (
      <View style = {{width: "100%",}}>
        <View style={style}>
      
        </View>
      </View>

  );
};
ProductTitlePlaceholder = Placeholder.connect(Title);
const TitleLarge = props => {
  const style = { backgroundColor: '#e3e3e3', width: "80%", height:30, borderRadius: 5};
  return (
      <View style = {{width: "100%",}}>
        <View style={style}>
      
        </View>
      </View>

  );
};
ProductTitlePlaceholderLarge = Placeholder.connect(TitleLarge);

const Desc = props => {
  const style = { backgroundColor: '#e3e3e3', width: "60%", height:15, borderRadius: 5};
  return (
      <View style = {{width: "100%",marginTop: 10,}}>
        <View style={style}>
      
        </View>
      </View>

  );
};
ProductDescPlaceholder = Placeholder.connect(Desc);

export default customPlaceholder = props => {
  const style = { backgroundColor: '#e3e3e3', width: "100%", height:200};
  return (
      <View style = {{backgroundColor: theme.listBackground}}>
          <BannerPlaceholder />
          <View style = {{marginTop: 5, padding: 15, backgroundColor: 'white'}}>
            <ProductTitlePlaceholderLarge animate="fade"/>
          </View>
          <View style = {{marginTop: 5, padding: 15, backgroundColor: 'white'}}>
            <ProductTitlePlaceholder animate="fade"/>
            <ProductDescPlaceholder animate="fade"/>
          </View>
          <View style = {{marginTop: 5, padding: 15, backgroundColor: 'white'}}>
            <ProductTitlePlaceholder animate="fade"/>
            <ProductDescPlaceholder animate="fade"/>
          </View>
      </View>

  );
};
