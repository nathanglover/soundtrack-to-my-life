const { gql } = require("apollo-server-lambda")

module.exports = gql`
  scalar Date

  # Context
  enum ContextType {
    album
    artist
    playlist
  }

  type Context {
    type: ContextType
    uri: String
    urls: Urls
  }

  # Image
  type Image {
    height: Int
    width: Int
    url: String
  }

  # Urls
  type Urls {
    api: String
    web: String
    preview: String
  }

  # Artist
  type Artist {
    id: ID!
    name: String
    uri: String
    urls: Urls
  }

  # Album
  enum AlbumType {
    album
    single
    compilation
  }
  enum ReleaseDatePrecision {
    day
    month
    year
  }
  type Album {
    id: ID!
    artists: [Artist]
    images: [Image]
    name: String
    release_date: Date
    release_date_precision: ReleaseDatePrecision
    total_tracks: Int
    type: AlbumType
    uri: String
    urls: Urls
  }

  # Track
  type Track {
    id: ID!
    album: Album
    artists: [Artist]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    name: String
    popularity: Int
    track_number: Int
    uri: String
    urls: Urls
  }

  # Timeline
  enum TimelineObjType {
    episode
    track
  }
  enum RepeatState {
    off
    track
    context
  }
  type TimelineObj {
    _id: ID!
    user: String!
    timestamp: Date!
    progress_ms: Int
    type: TimelineObjType!
    is_playing: Boolean
    shuffle_state: Boolean
    repeat_state: RepeatState
    context: Context
    track: Track
  }

  # Query
  type Query {
    timeline(date: Date): [TimelineObj]
  }
`
