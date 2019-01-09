import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query';
import { SHOPIFY_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/application'

const fetchShopifyGraphql = (config, body) => {
    return fetch(config.baseUrl + '/api/graphql', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': config.shopifyStoreAccessToken
        },
        body: body,
    })
}

const fetchShopify = (path) => {
    return fetch(SHOPIFY_URL + `/admin/${path}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
    })
}


export const getProduct = (config, id) => {
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
                    __args: {
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
                    __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}



export const getProductByHandle = (config, handle) => {
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
                __args: {
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
                __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getProductFromCollection = (config, id, cursor, sortKey, reverse) => {

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
                    __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}


export const getProductFromCollectionByHandle = (config, handle, cursor, sortKey, reverse) => {

    const query = {
        collectionByHandle: {
            __args: {
                handle: handle
            },
            title: true,
            id: true,
            products: {
                __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getProductListBySearch = (config, search, cursor, sortKey, reverse) => {

    const query = {
        products: {
            __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getCollections = (config) => {
    const query = {
        shop: {
            moneyFormat: true,
            name: true,
            primaryDomain: {
                url: true,
            },
            collections: {
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
                                        __args: {
                                            first: 1
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
            },
            products: {
                __args: {
                    first: 10,
                    sortKey: new EnumType('BEST_SELLING')
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
        },
        products: {
            __args: {
                first: 10,
                sortKey: new EnumType('CREATED_AT')
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getCheckout = (config, id) => {
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
                order: {
                    id: true,
                },
                lineItems: {
                    __args: {
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
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getShopDetail = (config) => {
    const query = {
        shop: {
            moneyFormat: true,
            name: true,
            primaryDomain: {
                url: true,
            },

        }
    }
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}

export const getCustomerAddress = (config, customerAccessToken) => {
    const query = {
        customer: {
            __args: {
                customerAccessToken: customerAccessToken
            },
            defaultAddress: {
                id: true
            },
            addresses: {
                __args: {
                    first: 10
                },
                edges: {
                    node: {
                        id: true,
                        address1: true,
                        address2: true,
                        city: true,
                        country: true,
                        firstName: true,
                        lastName: true,
                        province: true,
                        zip: true,
                    }
                }
            },
        }
    }
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}
export const getOrderList = (config, cursor, customerAccessToken) => {
    const query = {
        customer: {
            __args: {
                customerAccessToken: customerAccessToken
            },
            orders: {
                __args: {
                    first: 10,
                    after: cursor ? cursor : null,
                },
                edges: {
                    cursor: true,
                    node: {
                        totalPrice: true,
                        orderNumber: true,
                        name: true,
                        processedAt: true,
                        customerUrl: true,
                        id: true,
                        lineItems: {
                            __args: {
                                first: 10
                            },
                            edges: {
                                node: {
                                    title: true,
                                    quantity: true,
                                    variant: {
                                        title: true
                                    }
                                }
                            }
                        },
                        shippingAddress: {
                            id: true,
                            address1: true,
                            address2: true,
                            city: true,
                            country: true,
                            firstName: true,
                            lastName: true,
                            province: true,
                            zip: true,
                        }
                    }
                }
            },

        }
    }
    const graphQLQuery = '{' + jsonToGraphQLQuery(query, { pretty: true }) + '}'
    return fetchShopifyGraphql(config, graphQLQuery)
}


export const createCheckout = (config) => {
    const mutation = 'mutation {checkoutCreate(input: { lineItems: [] }) { checkout { id webUrl } } }'
    return fetchShopifyGraphql(config, mutation)
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
    return fetchShopifyGraphql(config, mutation)
}

export const removeProductFromCheckout = (config, lineItemId, checkoutId) => {
    const mutation = `mutation {
        checkoutLineItemsRemove(lineItemIds: "${lineItemId}", checkoutId: "${checkoutId}",
        ) {
          checkout {
             id
          }
        }
      }
      `
    return fetchShopifyGraphql(config, mutation)
}

export const addAddresstoCheckout = (config, address, checkoutId) => {
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
    return fetchShopifyGraphql(config, mutation)
}
export const addEmailToCheckout = (config, email, checkoutId) => {

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
    return fetchShopifyGraphql(config, mutation)
}

export const associateUserToCheckout = (config, accessToken, checkoutId) => {
    const mutation = `mutation {
        checkoutCustomerAssociateV2(checkoutId: "${checkoutId}", customerAccessToken: "${accessToken}") {
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
    return fetchShopifyGraphql(config, mutation)
}

export const registerUser = (config, user) => {
    const {
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
    return fetchShopifyGraphql(config, mutation)
}

export const createAccessToken = (config, user) => {
    const {
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
    return fetchShopifyGraphql(config, mutation)
}

export const renewAccessToken = (config, accessToken) => {

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
    return fetchShopifyGraphql(config, mutation)
}

export const createAddress = (config, accessToken, address) => {
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
    return fetchShopifyGraphql(config, mutation)
}

export const updateAddress = (config, accessToken, address) => {
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
    return fetchShopifyGraphql(config, mutation)
}

export const setDefaultAddress = (config, accessToken, addressId) => {

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
    return fetchShopifyGraphql(config, mutation)
}


export const fetchCountry = () => {
    const path = 'countries.json'
    return fetchShopify(path)
}