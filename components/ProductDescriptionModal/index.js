import React from 'react';
import { StyledOpacity, StyledText, StyledModal, StyledView, ModalContainer, ModalHeader, ModalContent} from './style'
import { Icon } from 'expo'
import { theme } from '../../constants/Theme'
import { View, TouchableOpacity, WebView}  from 'react-native'

export default class ProductDescriptionModal extends React.Component {
    constructor(props){
        super(props)
    }

    _keyExtractor = (item, index) => item;

    render (){
        return(
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
           
          }}>
            <StyledView>
                    <ModalContainer>
                        <ModalHeader>
                            <StyledOpacity onPress= {this.props.cancelPressed}>
                                <Icon.Entypo
                                    name='cross'
                                    size={26}
                                    color='white'
                                />
                            </StyledOpacity>
                            <StyledText>Description</StyledText>
                        </ModalHeader>
                        <ModalContent>
                        <WebView
                            source={{html: this.props.descriptionHtml}}
                            scalesPageToFit={false}
                        />
                        </ModalContent>
                        
                    </ModalContainer>

            </StyledView>
        </StyledModal>
        )
    }
}


