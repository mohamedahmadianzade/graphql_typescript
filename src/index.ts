import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
async function start()
{
  const { url } = await  startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({ 
      accessToken : req.headers.authorization
     }),
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}
start()

let a = 1;
console.log("hello world", 1);
