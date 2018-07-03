import {
  ObjectType,
  Field,
  Query,
  Resolver,
  Mutation,
  InputType,
  Arg,
  GraphQLISODateTime,
  FieldResolver,
  Root,
} from 'type-graphql'
import { MutationRequest } from '../../common/resolverUtils'
import { PersonRepository } from '../external/PersonRepository'
import { Person } from '../domain/Person'
import { Photo } from '../domain/Photo'
import { PhotoStorageService } from '../application/PhotoStorageService'
import { createSimpleConnection } from '../../common/Connection'

const AllPeopleConnection = createSimpleConnection({
  type: Person,
  name: 'AllPeople',
})

@Resolver(Person)
export class PersonResolver {
  constructor(
    public personRepository: PersonRepository,
    public photoStorageService: PhotoStorageService,
  ) {}

  @Query(() => Person, {
    nullable: true,
    description: 'Get an person by id',
  })
  person(@Arg('id') id: string) {
    return this.personRepository.findOne({ id })
  }

  @Query(() => AllPeopleConnection)
  async allPeople() {
    return new AllPeopleConnection(await this.personRepository.findAll())
  }

  @FieldResolver(() => Photo, {
    nullable: true,
  })
  photo(@Root() organiser: Person): Photo | undefined {
    if (!organiser.photo) {
      return undefined
    }

    return this.photoStorageService.getPhoto(organiser.photo)
  }
}
