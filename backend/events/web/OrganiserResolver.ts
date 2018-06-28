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
import { OrganiserRepository } from '../external/OrganiserRepository'
import { Organiser } from '../domain/Organiser'
import { Photo } from '../domain/Photo'
import { PhotoStorageService } from '../application/PhotoStorageService'
import { createSimpleConnection } from '../../common/Connection'

const AllOrganisersConnection = createSimpleConnection({
  type: Organiser,
  name: 'AllOrganisers',
})

@Resolver(Organiser)
export class OrganiserResolver {
  constructor(
    public organiserRepository: OrganiserRepository,
    public photoStorageService: PhotoStorageService,
  ) {}

  @Query(() => Organiser, {
    nullable: true,
    description: 'Get an organiser by id',
  })
  organiser(@Arg('id') id: string) {
    return this.organiserRepository.findOne(id)
  }

  @Query(() => AllOrganisersConnection)
  async allOrganisers() {
    return new AllOrganisersConnection(await this.organiserRepository.findAll())
  }

  @FieldResolver(() => Photo, {
    nullable: true,
  })
  photo(@Root() organiser: Organiser): Photo | undefined {
    if (!organiser.photo) {
      return undefined
    }

    return this.photoStorageService.getPhoto(organiser.photo)
  }
}
