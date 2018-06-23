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
import { Photo } from 'backend/events/domain/Photo'
import { PhotoStorageService } from 'backend/events/application/PhotoStorageService'

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

  @FieldResolver()
  photo(@Root() organiser: Organiser): Photo | undefined {
    if (!organiser.photo) {
      return undefined
    }

    return this.photoStorageService.getPhoto(organiser.photo)
  }
}
