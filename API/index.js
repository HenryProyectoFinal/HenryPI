import { ApolloServer } from 'apollo-server'
import './db.js'
import { typeDefs, resolvers } from './schema.js'

  //cargamos los definiciones y los resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  //Iniciamos server de apolo que se va a conectar con MongoDB
  server.listen()
  .then(({url}) => {
    console.log('Server is runnning on', url)
  })
  .catch((error) => {
    console.log('Error '. error.message)
  })
