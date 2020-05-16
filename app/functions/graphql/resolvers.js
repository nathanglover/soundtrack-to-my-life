const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const getFilter = ({ date, nextDate }) => {
  return {
    track: {
      $ne: null,
    },
    timestamp: {
      $gte: date,
      $lt: nextDate,
    },
  };
};

const projection = {
  timestamp: 1,
  "track.name": 1,
  "track.duration_ms": 1,
  "track.artists.name": 1,
  "track.urls": 1,
  "track.album.name": 1,
  "track.album.images.url": 1,
};
const sort = {
  timestamp: 1,
};

module.exports = (db) => ({
  Query: {
    timeline: async (obj, { date }, context, info) => {
      const nextDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );
      const timelineObjs = await db
        .collection("timeline")
        .find(getFilter({ date, nextDate }), { projection, sort })
        .toArray();
      return timelineObjs;
    },
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
        return new Date(+ast.value);
      }
      return null;
    },
  }),
});
