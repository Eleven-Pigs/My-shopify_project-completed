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
        this.setState({descriptionVisible: true})
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
                'Successfull',
                'Product added to cart',
                [
                  {text: 'Checkout', onPress: () => this.props.navigateToCart(), style: 'cancel'},
                  {text: 'Continue Shopping', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            this.props.resetIsAddedToCart()
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
                <VariantView>
                    <TouchableOpacity onPress = {this.openModal}>
                        <VariantText>Selected Variant</VariantText>
                        <VariantTitle>{this.props.variantTitle}</VariantTitle>
                    </TouchableOpacity>
                </VariantView>
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

