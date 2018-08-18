import { Service } from 'typedi'
import { oneOf } from 'backend/app/common/CrudRepository';
import { RegisterDeviceRequest, Device } from '../domain/Device'
import { DeviceRepository } from '../external/DeviceRepository'

@Service()
export class DeviceAdminService {
  constructor(public deviceRepository: DeviceRepository) {}

  registerDeviceToOwner(props: {
    device: RegisterDeviceRequest
    owner: string
  }): Promise<Device> {
    return this.deviceRepository.insert({ ...props.device, owner: props.owner })
  }

  async unregisterDevicesFromOwners(deviceIds: string[]) {
    await this.deviceRepository.delete({ id: oneOf(...deviceIds) })
  }
}
