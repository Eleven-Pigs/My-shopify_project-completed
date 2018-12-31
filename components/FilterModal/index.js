import React from 'react';
import { StyledText, StyledModal, StyledView, ModalContainer, ModalHeader, StyledOpacity} from './style'
import { Icon } from 'expo'
export const FilterModal = ({ visible, cancelPressed }) => {
    return(
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <StyledView>
                    <ModalContainer>
                        <ModalHeader>
                            <StyledOpacity onPress= {cancelPressed}>
                                <Icon.Entypo
                                    name='cross'
                                    size={26}
                                    color='white'
                                />
                            </StyledOpacity>
                            <StyledText>Sort By</StyledText>
                        </ModalHeader>
                    </ModalContainer>
            </StyledView>
        </StyledModal>
    )
}

