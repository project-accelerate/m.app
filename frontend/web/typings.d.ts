declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module 'apollo-upload-client' {
  import { ApolloLink } from 'apollo-link'

  interface UploadLinkProps {
    uri?: string
  }

  export function createUploadLink(props?: UploadLinkProps): ApolloLink
}
