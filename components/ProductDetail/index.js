import React from 'react';
import {  MainView,  Title, VariantView, VariantText, VariantTitle, HeaderView, PriceText, ProductInfoText, ProductInfoView } from './style'
import { TouchableOpacity, Alert } from 'react-native'
import VariantModalContainer  from '../../containers/VariantModal'
import ProductDescriptionModal from '../ProductDescriptionModal'
export default class ProductDetailComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            descriptionVisible: false,
        }
    }

    openModal = () => {
        this.setState({visible: true})
    }
    openDescriptionModal = () => {
        this.props.navigateToProductDescription()
    }
    cancelPressed = () => {
        this.setState({visible: false, descriptionVisible: false})
        
    }
    goToCheckout = () => {

    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.isProductAdded === true && prevProps.isProductAdded === false) {
            Alert.alert(
                'Product added to cart',
                'Do you want to proceed to checkout?',
                [
                  {text: 'No', onPress: () => {},style: 'cancel'},
                  {text: 'Yes', onPress: () => this.props.navigateToCart()},
                ],
                { cancelable: false }
              )
            this.props.resetIsAddedToCart()
        }
      }

    _renderSelectedVariant = (availableForSale, variantCount) => {
        if(availableForSale && variantCount > 1){
            return (
                <VariantView>
                    <TouchableOpacity onPress = {this.openModal}>
                        <VariantText>Selected Variant</VariantText>
                        <VariantTitle>{this.props.variantTitle}</VariantTitle>
                    </TouchableOpacity>
                </VariantView>
            )
        }else{
            return null
        }

    }

    render() {
        return (
            <MainView>
                <VariantModalContainer
                    visible={this.state.visible}
                    cancelPressed={this.cancelPressed}
                    itemSelected={this.itemSelected}
                />
                <ProductDescriptionModal
                    visible={this.state.descriptionVisible}
                    cancelPressed={this.cancelPressed}
                    itemSelected={this.itemSelected}
                    descriptionHtml={this.props.descriptionHtml}
                />
                <HeaderView>
                    <Title>{this.props.title}</Title>
                </HeaderView>
                {this._renderSelectedVariant(this.props.availableForSale, this.props.variantCount)}
                <VariantView>
                    <TouchableOpacity onPress = {this.openDescriptionModal}>
                        <VariantText>Description</VariantText>
                        <VariantTitle numberOfLines= {1}>{this.props.description}</VariantTitle>
                    </TouchableOpacity>
                </VariantView>
            </MainView>
        )
    }
}

