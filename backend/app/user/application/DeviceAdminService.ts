import { Service } from 'typedi'
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
}
