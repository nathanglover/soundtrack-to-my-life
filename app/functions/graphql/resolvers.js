const { GraphQLScalarType } = require("graphql")
const { Kind } = require("graphql/language")

module.exports = db => ({
  Query: {
    timeline: async (obj, { date }, context, info) => {
      const previousDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1
      )
      const timelineObjs = await db
        .collection("timeline")
        .find({
          timestamp: { $lte: date, $gt: previousDate },
          track: { $ne: null },
        })
        .sort({ timestamp: -1 })
        .toArray()
      return timelineObjs
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "A Date",
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value)
      }
      return null
    },
  }),
})
