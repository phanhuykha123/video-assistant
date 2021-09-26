import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const getAll = gql`
  query Query {
    getAll {
      content {
        name
        text
        thumb
        price
        sub_text
        buttons {
          text
          event
          data
        }
        condition {
          property
          value
          operator
        }
        regex
      }
    }
  }
`;
