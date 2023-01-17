import { gql } from 'apollo-server'
import { typeDefs as Brands, resolvers as resolversBrand } from './typeDefs/brands.js'

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`

export const resolvers = [resolversBrand]

export const typeDefs = [rootTypeDefs, Brands]