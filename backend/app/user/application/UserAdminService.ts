import { Service } from 'typedi'
import { User, UserProps } from '../domain/User'
import { UserRepository } from '../external/UserRepository'

@Service()
export class UserAdminService {
  constructor(private userRepository: UserRepository) {}

  async addUser(user: UserProps): Promise<User> {
    return this.userRepository.insert({
      ...user,
      consentToContact: Boolean(user.email),
    })
  }

  async update(id: string, change: Partial<UserProps>) {
    this.userRepository.update(id, change)
  }
}
