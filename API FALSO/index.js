import { ApolloServer } from 'apollo-server'
import './db.js'
import { typeDefs, resolvers } from './schema.js'
import { verifyToken } from './validate.js'

//cargamos los definiciones y los resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //const { authorization: token } = req.headers;
    let isAuthenticated = false;
    try{
      const authHeader = req.headers.authorization || ""

      if(authHeader) {
        const token = authHeader.split(" ")[1]
        const payload = await verifyToken(token)
        isAuthenticated = payload && payload.sub ? true : false
      }
    }catch(error) {
      console.error(error.message)
    }

    return { isAuthenticated }    
  }
})

//Iniciamos server de apolo que se va a conectar con MongoDB
server.listen()
.then(({url}) => {
  console.log('Server is runnning on', url)
})
.catch((error) => {
  console.log('Error '. error.message)
})
