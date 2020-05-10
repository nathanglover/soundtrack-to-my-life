import ApolloClient from "apollo-boost";

export default new ApolloClient({
  uri: "/.netlify/functions/graphql",
});
