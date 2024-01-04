import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

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

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      _id
      name
      stock
      price
      imgUrl
      authorId
      likes {
        userId
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
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
