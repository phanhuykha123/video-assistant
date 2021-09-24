import gql from 'graphql-tag';

export const createNodeQuery = gql`
  mutation CreateContentMutation($createContentDto: NodeInput, $createContentIdContent: String) {
    createContent(dto: $createContentDto, idContent: $createContentIdContent) {
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

export const deleteNodeQuery = gql`
  mutation DeleteContentMutation($deleteContentIdContent: String, $deleteContentName: String) {
    deleteContent(idContent: $deleteContentIdContent, name: $deleteContentName) {
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
          operator
          value
          property
        }
      }
    }
  }
`;

export const updateNodeQuery = gql`
  mutation Mutation($updateContentIdContent: String, $updateContentUpdatedNode: NodeInput) {
    updateContent(idContent: $updateContentIdContent, updatedNode: $updateContentUpdatedNode) {
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
