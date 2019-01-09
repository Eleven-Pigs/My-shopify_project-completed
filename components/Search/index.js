import React from 'react';
import { StyledView } from './style'
import Search from 'react-native-search-box';
import { theme } from '../../constants/Theme'

export default class SearchBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {searchInput: this.props.defaultValue}
  }
  afterSearch = () => {
    return new Promise((resolve, reject) => {
        this.props.onPressSearch(this.state.searchInput)

        resolve();
    });
  }
      // Important: You must return a Promise
  beforeFocus = () => {
        return new Promise((resolve, reject) => {
          if(this.props.beforeFocusSearch){
            this.props.beforeFocusSearch() 
          }        
          resolve()
        });
  }
  afterCancel = () => {
      return new Promise((resolve, reject) => {
        if(this.props.afterCancel){
          this.props.afterCancel() 
        }
        
          resolve();
      });
  }
  changeTextInput = (text) => {
    this.setState({searchInput: text})
  }

  render() {
        return (
            <StyledView>
                <Search
                    ref="search_box"
                    backgroundColor= "white"
                    afterSearch= {this.afterSearch}
                    afterCancel= {this.afterCancel}
                    beforeFocus={this.beforeFocus}
                    returnKeyType= "search"
                    onChangeText= {(text) => this.changeTextInput(text)}
                    defaultValue={this.props.defaultValue}
                    titleCancelColor= {this.props.iconColor}
                   
                    /**
                    * There many props that can customizable
                    * Please scroll down to Props section
                    */
                />
            </StyledView>

          
        )
  }

}

