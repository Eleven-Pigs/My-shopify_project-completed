import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query';
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
                description: true,
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
                            title: true,
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



export const getProductByHandle = (handle) => {
    const query = {
        productByHandle: {
            __args: {
                handle: handle 
            },
                title: true,
                descriptionHtml: true,
                description: true,
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
                            title: true,
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
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const getProductFromCollection = (id, cursor, sortKey, reverse) => {
    
    const query = {
        node: {
            __args: {
                id: id 
            },
            __on: {
                __typeName: "Collection",
                title: true,
                id: true,
                products: {
                    __args:{
                        first: 10,
                        after: cursor ? cursor : null,
                        sortKey: sortKey ? new EnumType(sortKey) : null,
                        reverse: reverse ? reverse : null
                    },
                    edges: {
                        cursor: true,
                        node: {
                            id: true,
                            title: true,
                            priceRange: {
                                maxVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                                minVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                            },
                            images: {
                                __args: {
                                    first: 1 
                                },
                                edges: {
                                    node: {
                                        originalSrc: true
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
    }
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}


export const getProductFromCollectionByHandle = (handle, cursor, sortKey, reverse) => {
    
    const query = {
        collectionByHandle: {
            __args: {
                handle: handle 
            },
                title: true,
                id: true,
                products: {
                    __args:{
                        first: 30,
                        after: cursor ? cursor : null,
                        sortKey: sortKey ? new EnumType(sortKey) : null,
                        reverse: reverse ? reverse : null
                    },
                    edges: {
                        cursor: true,
                        node: {
                            id: true,
                            title: true,
                            priceRange: {
                                maxVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                                minVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                            },
                            images: {
                                __args: {
                                    first: 1 
                                },
                                edges: {
                                    node: {
                                        originalSrc: true
                                    }
                                }
                            },
                        }
                    }
                }
            
        }
    }
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const getProductListBySearch = (search, cursor, sortKey, reverse) => {
    
    const query = {
                products: {
                    __args:{
                        first: 30,
                        query: `${search}`,
                        after: cursor ? cursor : null,
                        sortKey: sortKey ? new EnumType(sortKey) : null,
                        reverse: reverse ? reverse : null
                    },
                    edges: {
                        cursor: true,
                        node: {
                            id: true,
                            title: true,
                            priceRange: {
                                maxVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                                minVariantPrice: {
                                    amount: true,
                                    currencyCode: true,
                                },
                            },
                            images: {
                                __args: {
                                    first: 1 
                                },
                                edges: {
                                    node: {
                                        originalSrc: true
                                    }
                                }
                            },
                        }
                    }
                }
            
        
    }
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const getCollections = () => {
    const query = {
        shop: {
            collections:{
                __args: {
                    first: 250
                },
                edges: {
                    node: {
                        id: true,
                        handle: true,
                        description: true,
                        title: true,
                        image: {
                          originalSrc: true,
                        },
                        products: {
                            __args: {
                                first: 1
                            },
                            edges: {
                                cursor: true,
                                node: {
                                    images: {
                                        __args:{
                                            first:1
                                        },
                                        edges: {
                                            node: {
                                                originalSrc: true
                                            }
                                        }
                                    }
                                }
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
                webUrl: true,
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
                                id: true,
                                price: true,
                                image: {
                                    originalSrc: true,
                                },
                                product: {
                                    id: true,
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

export const getMoneyFormat = () => {
    const query = {
        shop: {
            moneyFormat: true
        }
    } 
    const graphQLQuery = '{' +  jsonToGraphQLQuery(query, {pretty: true}) + '}'
    return fetchShopifyGraphql(graphQLQuery)
}

export const createCheckout = () => {
    const mutation = 'mutation {checkoutCreate(input: { lineItems: [] }) { checkout { id webUrl } } }'
    return fetchShopifyGraphql(mutation)
}
export const addProductToCheckout = (variantId, quantity, checkoutId) => {
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
export const addEmailToCheckout = (email, checkoutId) => {

    const mutation = `mutation{
        checkoutEmailUpdateV2(checkoutId: "${checkoutId}", email: "${email}") {
          userErrors {
            field
            message
          }
          checkout {
            id
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
      `
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

export const registerUser = (user) => {
 const  {
            email,
            password
        } = user

    const mutation = `mutation {
        customerCreate(input: {
          email: "${email}"
          password: "${password}"
        }) {
          userErrors {
            field
            message
          }
          customer {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const createAccessToken = (user) => {
 const  {
            email,
            password
        } = user
    const mutation = `mutation customerAccessTokenCreate {
        customerAccessTokenCreate(input: {
          email: "${email}"
          password: "${password}"
        }) {
          userErrors {
            field
            message
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const renewAccessToken = (accessToken) => {

    const mutation = `mutation {
        customerAccessTokenRenew(customerAccessToken: "${accessToken}") {
          userErrors {
            field
            message
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const createAddress = (accessToken, address) => {
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
        customerAddressCreate(customerAccessToken: ${accessToken}, address:{
            address1: "${address1}"
            address2: "${address2}"
            province: "${province}"
            city: "${city}"
            zip: "${zip}"
            country: "${country}"
            firstName: "${firstName}"
            lastName: "${lastName}"
        } ) {
          userErrors {
            field
            message
          }
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const updateAddress = (accessToken, address) => {
    const {
        address1,
        address2,
        province,
        city,
        zip,
        lastName,
        firstName,
        country,
        id,   
    } = address
    const mutation = `mutation {
        customerAddressUpdate(customerAccessToken: ${accessToken}, id: ${id}, address:{
            address1: "${address1}"
            address2: "${address2}"
            province: "${province}"
            city: "${city}"
            zip: "${zip}"
            country: "${country}"
            firstName: "${firstName}"
            lastName: "${lastName}"
        } ) {
          userErrors {
            field
            message
          }
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}

export const setDefaultAddress = (accessToken, addressId) => {

    const mutation = `mutation {
        customerDefaultAddressUpdate(customerAccessToken: ${accessToken}, addressId: ${addressId}) {
          userErrors {
            field
            message
          }
          customer {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`
    return fetchShopifyGraphql(mutation)
}


export const fetchCountry = () => {
    const path = 'countries.json'
    return fetchShopify(path)
}