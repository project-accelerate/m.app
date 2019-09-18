import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Photo } from '../domain/Photo'
import { PhotoStorageService } from '../application/PhotoStorageService'
import { GraphQLString } from 'graphql'

@Resolver(Photo)
class PhotoResolver {
  constructor(private photoStorageService: PhotoStorageService) {}

  @FieldResolver(() => GraphQLString)
  sourceUrl(@Root() photo: Photo) {
    if (photo.id.startsWith('http')) {
      return photo.id
    }

    return this.photoStorageService.getPhotoUrl(photo.id)
  }
}
