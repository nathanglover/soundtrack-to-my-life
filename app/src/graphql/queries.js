import { gql } from "apollo-boost";

export const TIMELINE_QUERY = gql`
  query timeline($date: Date) {
    timeline(date: $date) {
      timestamp
      track {
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
