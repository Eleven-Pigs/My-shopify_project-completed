import React from "react";
import {View, Text} from 'react-native'
import { Main } from '../Styled'
import Placeholder from "rn-placeholder";

const Banner = props => {
  const style = { backgroundColor: '#e3e3e3', width: "100%", height:300};
  return (
      <View>
        <View style={style}>
      
        </View>
      </View>

  );
};
BannerPlaceholder = Placeholder.connect(Banner);

const Title = props => {
  const style = { backgroundColor: '#e3e3e3', width: "80%", height:30, marginTop: 50};
  return (
      <View style = {{width: "100%", alignItems: 'center'}}>
        <View style={style}>
      
        </View>
      </View>

  );
};
TitlePlaceholder = Placeholder.connect(Title);

export default customPlaceholder = props => {
  const style = { backgroundColor: '#e3e3e3', width: "100%", height:200};
  return (
      <View>
        <BannerPlaceholder animate="fade"/>
          <TitlePlaceholder animate="fade"/>
      </View>

  );
};
