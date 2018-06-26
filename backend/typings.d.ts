declare module 'apollo-upload-server' {
  import { GraphQLScalarType } from 'graphql'
  import { Readable } from 'stream'

  export const GraphQLUpload: GraphQLScalarType

  export type FileUpload = Promise<FileUploadData>

  export interface FileUploadData {
    stream: Readable
    filename: string
    mimetype: string
    encoding: string
  }
}
