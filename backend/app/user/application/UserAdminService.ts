import { Service } from 'typedi'
import { CreateUserRequest, User } from '../domain/User'
import { UserRepository } from '../external/UserRepository'

@Service()
export class UserAdminService {
  constructor(private userRepository: UserRepository) {}

  async addUser(user: CreateUserRequest): Promise<User> {
    return this.userRepository.insert(user)
  }
}
