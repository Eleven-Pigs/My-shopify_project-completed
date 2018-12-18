import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/application'

const fetchShopifyGraphql = (body) => {
    
    return fetch('https://aslkdfjlasdfj.myshopify.com/api/graphql', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
        body: body,
    })
}

const fetchShopify = (path) => {
    return fetch(`https://aslkdfjlasdfj.myshopify.com/admin/${path}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
    })
}

export const testRequest = () => {
    const query = {
        shop: {
            name: true,
            primaryDomain: {
                url : true,
                host: true
            }
        }
    } 

    return fetchShopifyGraphql(query)
}

export const getProduct = (id) => {
    const query = {
        node: {
            __args: {
                id: id 
            },
            __on: {
                __typeName: "Product",
                title: true,
                descriptionHtml: true,
                id: true,
                availableForSale: true,
                productType: true,
                images: {
                    __args:{
                        first: 250
                    },
                    edges: {
                        node: {
                            id: true,
                            originalSrc: true
                        }
                    }
                },
                variants: {
                    __args:{
                        first: 100
                    },
                    edges: {
                        node: {
                            id: true,
                            price: true,
                            availableForSale: true,
                            image: {
                                id: true
                            },
                            selectedOptions: {
                                name: true,
                                value: true
                            }
                        }
                    }
                }
            }
        }
    } 
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const getCheckout = (id) => {
    const query = {
        node: {
            __args: {
                id: id 
            },
            __on: {
                __typeName: "Checkout",
                id: true,
                totalPrice: true,
                subtotalPrice: true,

                shippingAddress: {
                    address1: true,
                    address2: true,
                    city: true,
                },
                order:{
                    id: true,
                },
                lineItems: {
                    __args:{
                        first: 250
                    },
                    edges: {
                        node: {
                            id: true,
                            title: true,
                            quantity: true,
                            variant: {
                                title: true,
                                selectedOptions: {
                                    name: true,
                                    value: true,
                                }
                            }
                        }
                    }
                },

            }
        }
    } 
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const createCheckout = () => {
    const mutation = 'mutation {checkoutCreate(input: { lineItems: [] }) { checkout { id webUrl } } }'
    return fetchShopifyGraphql(mutation)
}
export const addProductToCheckout = (product, checkoutId) => {
    const variantId = product.variantId
    const quantity = product.quantity
    const mutation = `mutation {
        checkoutLineItemsAdd(lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }], checkoutId: "${checkoutId}",
        ) {
          checkout {
             id
             lineItems(first:100) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const addAddresstoCheckout = (address, checkoutId) => {
    const {
        address1,
        address2,
        province,
        city,
        zip,
        lastName,
        firstName,
        country,       
    } = address

    const mutation = `mutation {
        checkoutShippingAddressUpdateV2(shippingAddress: {
          address1: "${address1}"
          address2: "${address2}"
          province: "${province}"
          city: "${city}"
          zip: "${zip}"
          country: "${country}"
          firstName: "${firstName}"
          lastName: "${lastName}"
        }, checkoutId: "${checkoutId}" ) {
          userErrors {
            field
            message
          }
          checkout {
            id
            shippingAddress {
              firstName
              lastName
              address1
              province
              country
              city
              zip
            }
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const associateUserToCheckout = (accessToken, checkoutId) => {
    const mutation = `mutation {
        checkoutCustomerAssociateV2(checkoutId: ${checkoutId}, customerAccessToken: ${accessToken}) {
          userErrors {
            field
            message
          }
          checkout {
            id
          }
          customer {
            id
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const fetchCountry = () => {
    const path = 'countries.json'
    return fetchShopify(path)
}