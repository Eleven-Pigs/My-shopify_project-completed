import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/application'

const fetchShopify = (body) => {
    
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

    return fetchShopify(query)
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
    return fetchShopify(graphQLQuery)
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
                lineItems: {
                    __args:{
                        first: 250
                    },
                    edges: {
                        node: {
                            id: true,
                            title: true,
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
    return fetchShopify(graphQLQuery)
}

export const createCheckout = () => {
    const mutation = 'mutation {checkoutCreate(input: { lineItems: [] }) { checkout { id webUrl } } }'
    return fetchShopify(mutation)
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
    return fetchShopify(mutation)
}