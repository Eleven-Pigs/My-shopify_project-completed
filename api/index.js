import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/application'

const fetchShopify = (query) => {
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetch('https://aslkdfjlasdfj.myshopify.com/api/graphql', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
        body: graphQLQuery,
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
                vendor: true,
                availableForSale: true,
                productType: true,
                images: {
                    __args:{
                        first: 250
                    },
                    edges: {
                        node: {
                            id: true
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
    return fetchShopify(query)
}