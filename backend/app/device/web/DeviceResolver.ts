import { Resolver, FieldResolver, Root, Arg, Query } from 'type-graphql'
import { User } from 'backend/app/user/domain/User'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { Device } from '../domain/Device'
import { DeviceRepository } from '../external/DeviceRepository'

@Resolver(() => Device)
export class DeviceResolver {
  constructor(
    public userRepository: UserRepository,
    public deviceRepository: DeviceRepository,
  ) {}

  @Query(() => Device)
  device(@Arg('id') id: string): Promise<Device | undefined> {
    return this.deviceRepository.findOne({ id })
  }

  @FieldResolver(() => User)
  owner(@Root() device: Device): Promise<User> {
    return this.userRepository.findOneRequired({ id: device.owner })
  }
}
