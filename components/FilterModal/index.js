import React from 'react';
import { StyledText, StyledModal, StyledView, ModalContainer} from './style'
export const FilterModal = ({ visible }) => {
    return(
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <StyledView>
                    <ModalContainer >
                        <StyledText> Popularity</StyledText>
                    </ModalContainer>
            </StyledView>
        </StyledModal>
    )
}

