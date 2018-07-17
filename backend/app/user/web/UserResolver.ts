import { Resolver, FieldResolver, Root, Arg, Query } from 'type-graphql'
import { Device } from '../domain/Device'
import { User } from '../domain/User'
import { UserRepository } from '../external/UserRepository'
import { DeviceRepository } from 'backend/app/user/external/DeviceRepository'

@Resolver(() => User)
export class UserResolver {
  constructor(
    public userRepository: UserRepository,
    public deviceRepository: DeviceRepository,
  ) {}

  @Query(() => User)
  user(@Arg('id') id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id })
  }

  @FieldResolver(() => [Device])
  devices(@Root() user: User): Promise<Device[]> {
    return this.deviceRepository.find({
      owner: user.id,
    })
  }
}
