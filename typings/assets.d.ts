declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  export = DocumentNode
}

declare module "*.png" {
  const uri: string
  export = uri
}
