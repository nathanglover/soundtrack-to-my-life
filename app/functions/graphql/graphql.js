const { ApolloServer } = require("apollo-server-lambda");
const connectToMongoDB = require("./db");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

exports.handler = async function (event, context) {
  const db = await connectToMongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db),
  });
  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args));
    server.createHandler()(event, context, callback);
  });
};
