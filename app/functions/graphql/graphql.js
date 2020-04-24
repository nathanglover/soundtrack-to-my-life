const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Album {
    id: ID!
    name: String!
  }

  type Artist {
    id: ID!
    name: String!
  }

  type Track {
    id: ID!
    album: Album
    artists: [Artist]! # Valid [], [... some data]
    explicit: Boolean
    name: String!
    popularity: Int # or Float
  }

  type Query {
    tracks: [Track]
    track(id: ID): Track
  }
`;

const tracks = [
  {
    id: "1",
    artists: [
      {
        id: "1",
        name: "Ra Ra Riot",
      },
    ],
    explicit: false,
    name: "Belladonna",
    popularity: 22,
  },
  {
    id: "2",
    artists: [
      {
        id: "2",
        name: "TREY",
      },
    ],
    explicit: false,
    name: "Wilderness",
    popularity: 22,
  },
];

const resolvers = {
  Query: {
    tracks: () => {
      return tracks;
    },

    track: (obj, { id }, context, info) => {
      const track = tracks.find((track) => {
        return track.id == id;
      });
      return track;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
