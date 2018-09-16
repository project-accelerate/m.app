import {
  ObjectType,
  Field,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Ctx,
} from 'type-graphql'
import { UserAdminService } from 'backend/app/user/application/UserAdminService'
import { GraphQLBoolean } from 'graphql'
import { MutationRequest } from 'backend/app/common/resolverUtils'
import { CreateUserRequest, User } from 'backend/app/user/domain/User'

@ObjectType()
export class UserMutation {
  @Field() id!: string
}

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(private userAdminService: UserAdminService) {}

  @Mutation()
  mutateUser(@Arg('id') id: string): UserMutation {
    return { id }
  }

  @FieldResolver(() => User)
  async update(
    @Ctx() user: UserMutation,
    @MutationRequest(() => CreateUserRequest)
    change: CreateUserRequest,
  ): Promise<User> {
    await this.userAdminService.update(user.id, change)
    return {
      id: user.id,
      ...change,
    }
  }
}
