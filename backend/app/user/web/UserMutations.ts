import { ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql'

@ObjectType()
export class UserMutation {
  @Field() id!: string
}

@Resolver()
export class UserMutationResolver {
  @Mutation()
  mutateUser(@Arg('id') id: string): UserMutation {
    return { id }
  }
}
