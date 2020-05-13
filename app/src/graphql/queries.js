import { gql } from "apollo-boost";

export const TIMELINE_QUERY = gql`
  query timeline($date: Date) {
    timeline(date: $date) {
      timestamp
      track {
        id
        name
        artists {
          name
        }
        urls {
          web
          preview
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }
`;
