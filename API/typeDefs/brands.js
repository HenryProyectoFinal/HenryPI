import { gql, UserInputError } from "apollo-server"
import Brand from '../models/brand.js'

/*
* QUERY:
*   We create the queries that will be able to be consulted
*   and the type of data to return
*
* MUTATION:
*   We create the mutations (update, delete, etc) that will be able to be executed
*   and the type of data to return
*
* MODEL:
*   We create the model, with the types of data it has in the DB
*   (to set a data as required, use !)
*/
export const typeDefs = gql`

  extend type Query {
    brandCount: Int!,
    allBrands: [Brand]!
  }

  extend type Mutation {
    createBrand(name: String!): Brand,
    editBrand(name: String!, id: ID!): Brand,
    deleteBrand(id: ID!): Boolean
  }

  type Brand {
    name: String!
    active: Boolean!
    id: ID!
  }
`

/*
* Resolvers:
*   Estas son las querys y mutaciones que difinimos arriba.
*   Aqui las definimos y impactamos sobre la DB
*/
export const resolvers = {
  Query: {
    /*
    * Number of record in the DB
    */
    brandCount: () => Brand.collection.countDocuments(),
    /*
    * Return all brands
    */
    allBrands: async (root, args) => {
      return Brand.find({})
    }
  },

  Mutation: {
    /*
    * Create a new brand
    *
    * @param: String name
    * @param: Boolean active (true default)
    * 
    * @return: Brand
    */
    createBrand: async (root, args) => {
      const brand = new Brand({...args})
      try {
        await brand.save()
      }catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return brand
    },

    /*
    * Edit a brand
    * 
    * @param ID id
    * @param String name
    *
    * @return Brand
    */
    editBrand: async (root, args) => {
      const brand = await Brand.findById({_id: args.id})
      if (!brand) return

      brand.name = args.name
      brand.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })

      return brand
    },

    /*
    * Delete brand
    *
    * @param ID id
    * 
    * @return Boolean
    */
    deleteBrand: async (root, args) => {
      const brand = await Brand.findById({_id: args.id})
      if (!brand) return

      brand.active = false
      brand.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })

      return true
    }
  }
}