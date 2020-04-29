const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

module.exports = (db) => ({
  Query: {
    timeline: async () =>
      await db.collection("timeline").find().limit(5).toArray(),
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "A Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
});
