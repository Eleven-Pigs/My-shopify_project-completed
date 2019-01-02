import React from 'react';
import {  MainView,  Title, VariantView, VariantText, VariantTitle, HeaderView, PriceText, ProductInfoText, ProductInfoView } from './style'
import { TouchableOpacity } from 'react-native'
import VariantModalContainer  from '../../containers/VariantModal'

export default class ProductDetailComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        }
    }

    openModal = () => {
        this.setState({visible: true})
    }
    cancelPressed = () => {
        this.setState({visible: false})
        
    }
    itemSelected = (sort) => {

    }

    render() {
        return (
            <MainView>
                <VariantModalContainer
                    visible={this.state.visible}
                    cancelPressed={this.cancelPressed}
                    itemSelected={this.itemSelected}
                />
                <HeaderView>
                    <Title>{this.props.title}</Title>
                </HeaderView>
                <VariantView>
                    <TouchableOpacity onPress = {this.openModal}>
                        <VariantText>Selected Variant</VariantText>
                        <VariantTitle>{this.props.variantTitle}</VariantTitle>
                    </TouchableOpacity>
                </VariantView>
                <VariantView>
                    <TouchableOpacity onPress = {this.openModal}>
                        <VariantText>Description</VariantText>
                        <VariantTitle numberOfLines= {1}>{this.props.description}</VariantTitle>
                    </TouchableOpacity>
                </VariantView>
            </MainView>
        )
    }
}

