import React from 'react';
import { StyledView, StyledOpacity } from './style'
import  Materialicons from '../Reusable/TabBarIcon/Materialicons'

export const FilterTab = ({ sortPressed, filterPressed }) => {
    return(
     <StyledView>
        <StyledOpacity onPress={sortPressed}>
          <Materialicons
            focused={true}
            name='sort'
          />
        </StyledOpacity>
        <StyledOpacity  onPress={filterPressed}>
          <Materialicons
            focused={true}
            name='filter-list'
          />
        </StyledOpacity>
      </StyledView>
    )
}

