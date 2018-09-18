import {
  ObjectType,
  Field,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Ctx,
  Root,
  InputType,
} from 'type-graphql'
import { UserAdminService } from 'backend/app/user/application/UserAdminService'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { User, CreateUserRequest } from 'backend/app/user/domain/User'

@ObjectType()
export class UserMutation {
  @Field() id!: string
}

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(
    private userAdminService: UserAdminService,
    private userRepository: UserRepository,
  ) {}

  @Mutation()
  mutateUser(@Arg('id') id: string): UserMutation {
    return { id }
  }

  @FieldResolver(() => User)
  async privacyOptOut(@Root() user: UserMutation): Promise<User> {
    await this.userAdminService.update(user.id, {
      email: '',
      consentToContact: false,
    })
    return this.userRepository.findOneRequired({ id: user.id })
  }

  @FieldResolver(() => User)
  async update(
    @Root() user: UserMutation,
    settings: CreateUserRequest,
  ): Promise<User> {
    await this.userAdminService.update(user.id, settings)
    return this.userRepository.findOneRequired({ id: user.id })
  }
}
