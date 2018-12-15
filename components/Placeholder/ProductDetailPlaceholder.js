import React from "react";
import {View, Text} from 'react-native'
import { Main } from '../Styled'
import Placeholder from "rn-placeholder";

const customPlaceholder = props => {
  const style = { backgroundColor: props.bgColor, width: "100%", height:200};
  return (
      <View>
        <View style={style}>
      
        </View>
      </View>

  );
};

export default Placeholder.connect(customPlaceholder);
