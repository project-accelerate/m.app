import { CrudRepository, CrudRepositoryConfig } from "../../../common/CrudRepository";
import { Organiser, OrganiserProps } from "../domain/Organiser";

const config: CrudRepositoryConfig<Organiser> = {
  tableName: 'organiser'
}

export class OrganiserRepository extends CrudRepository<Organiser, OrganiserProps>(config) {
}