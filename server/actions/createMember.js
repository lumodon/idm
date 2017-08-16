import config from 'src/config'
import graphQLFetcher from 'src/server/util/graphql'

export default async function createMember(id, inviteCode) {
  let result
  try {
    result =
      await graphQLFetcher(config.server.echo.baseURL)({
        query: `
          mutation($id: ID!, $inviteCode: String!) {
            createMember(id: $id, inviteCode: $inviteCode) {
              id
              chapterId
            }
          }
        `,
        variables: {id, inviteCode},
      })
  } catch (error) {
    throw error
  }
  return result
}
