import { Arg } from "type-graphql";
import { ReturnTypeFunc } from "type-graphql/types/decorators";

/** Sugar for the request param to a mutation */
export const MutationRequest = (type: ReturnTypeFunc) => Arg('request', type)
