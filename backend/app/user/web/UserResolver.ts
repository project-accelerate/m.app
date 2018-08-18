import { Resolver, FieldResolver, Root, Arg, Query } from 'type-graphql'
import { Device } from 'backend/app/device/domain/Device'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { User } from '../domain/User'
import { UserRepository } from '../external/UserRepository'

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
