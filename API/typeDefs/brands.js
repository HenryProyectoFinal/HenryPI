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
    allBrands (active: Boolean): [Brand]!
    findBrand (name: String!): Brand!
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
    *
    * @return Int
    */
    brandCount: () => Brand.collection.countDocuments(),
    /*
    * Return all brands, active brand or inactive brand
    *
    * @param Boolean active (no required)
    * @return [Brand]
    */
    allBrands: async (root, args) => {
      if(!args.active) return Brand.find({})

      return Brand.find({ active: args.active })
    },
    /*
    * Find a specific brand
    *
    * @param String name
    * 
    * @return Brand
    */
    findBrand: async (root, args) => {
      const { name } = args
      try {
        return Brand.findOne({ name })
      }catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
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