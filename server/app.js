require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { productTypeDefs, productResolvers } = require("./schemas/product");
const { responseTypeDefs } = require("./schemas/response");
const PORT = process.env.PORT || 4000;
const mongoConnection = require("./config/db");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { GraphQLError } = require("graphql");
const { verifyToken } = require("./utils/jwt");
const { findOneUser } = require("./models/user");
const { ObjectId } = require("mongodb");
const authentication = require("./utils/auth");

const server = new ApolloServer({
  typeDefs: [productTypeDefs, responseTypeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
  // introspection: true, // ini buat nanti pas deploy aja
});

(async () => {
  try {
    await mongoConnection.connect();
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      context: async ({ req, res }) => {
        // console.log("this console will be triggered on every request");

        return {
          doAuthentication: () => authentication(req),
        };
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
