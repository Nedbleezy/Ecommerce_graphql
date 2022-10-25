export const FETCH_ALL_PRODUCTS_CATEGORIES = `
query Cedum {
  currencies{
    label
    symbol
  }
  categories {
    name
    
  }
}
`;

//to get all products in the ALL category
export const FETCH_ALL_PRODUCTS_IN_THE_ALL_CATEGORY = `
query ALL_CATEGORY_PRODUCTS {
    categories {
      name
  
      products {
        name
        gallery
        brand
        inStock
        id
  
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;
export const ALL_PRODUCT_CATEGORIES = `
query AllCategories {
    categories {
      name
    }
  }
`;
export const ALL_CURRENCIES = `
query AllCurrencies{
    currencies{
      label
      symbol
    }
  }
`;

//use to fetch data by category name
export const FETCH_PRODUCT_BY_CATEGORY = `
query getCategory($input: CategoryInput) {
  category(input: $input) {
    name

    products {
      name
      id
      inStock
      brand
      gallery
      description
      category

      attributes {
        id
        name
        type

        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}

`;

export const GET_PRODUCTDETAILS_BY_ID = `
    query getProductDetailsById($id: String!) {
        product(id: $id) {
            id
            name
            brand
            description
            inStock
            gallery
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
`;
export const PRODUCT_ATTRIBUTES = `
    query getProductDetailsById($id: String!) {
        product(id: $id) {
            id
            name
            brand
            description
            inStock
            gallery
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
`;
