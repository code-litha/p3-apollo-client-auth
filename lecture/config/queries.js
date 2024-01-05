import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products {
    products {
      statusCode
      message
      error
      data {
        _id
        name
        stock
        price
        imgUrl
      }
    }
  }
`;

export const PRODUCT_CREATE = gql`
  mutation ProductCreate($input: ProductCreateInput) {
    productCreate(input: $input) {
      statusCode
      message
      error
      data {
        _id
        name
      }
    }
  }
`;
