import { Resolver, FieldResolver, Root, Arg, Query } from 'type-graphql'
import { DeviceRepository } from 'backend/app/user/external/DeviceRepository'
import { Device } from '../domain/Device'
import { User } from '../domain/User'
import { UserRepository } from '../external/UserRepository'

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
