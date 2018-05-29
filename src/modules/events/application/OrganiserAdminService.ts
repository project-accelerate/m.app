import { Service } from "typedi";
import { OrganiserRepository } from "../external/OrganiserRepository";
import { OrganiserProps } from "../domain/Organiser";

@Service()
export class OrganiserAdminService {
  constructor(
    private readonly organiserRepository: OrganiserRepository
  ) { }
  
  addOrganiser(props: OrganiserProps) {
    return this.organiserRepository.insert(props)
  }
}
