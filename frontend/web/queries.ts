/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreateEventRequest {
  name: string
  organiser: string
  speakers: Array<string>
  venue: string
  startTime: string
  endTime: string
  introduction: string
  detail: string
  photoUpload?: string | null
}

export interface CreateOrganiserRequest {
  name: string
  bio?: string | null
  photoUpload?: string | null
}

export interface CreateVenueRequest {
  name: string
  description: string
  photoUpload?: string | null
  address: AddressInput
}

export interface AddressInput {
  streetAddress: string
  city: string
  postcode: string
}

export interface CreateEventMutationVariables {
  req: CreateEventRequest
}

export interface CreateEventMutation {
  // Submit a new event
  createEvent: {
    id: string
  }
}

export interface EventAdminPageQuery {
  venueOptions: {
    edges: Array<{
      node: {
        id: string
        name: string
      }
    }>
  }
  speakerOptions: {
    edges: Array<{
      node: {
        id: string
        name: string
      }
    }>
  }
  allEvents: {
    edges: Array<{
      node: {
        id: string
        name: string
        speakers: {
          edges: Array<{
            node: {
              id: string
              name: string
            }
          }>
        }
        // Return the event venue
        venue: {
          id: string
          name: string
        }
        startTime: string
        endTime: string
        introduction: string
        detail: string
        photo: {
          sourceUrl: string
        } | null
      }
    }>
  }
}

export interface CreateOrganiserMutationVariables {
  req: CreateOrganiserRequest
}

export interface CreateOrganiserMutation {
  createOrganiser: {
    id: string
  }
}

export interface OrganiserAdminPageQuery {
  allOrganisers: {
    edges: Array<{
      node: {
        id: string
        name: string
        bio: string | null
        photo: {
          sourceUrl: string
        } | null
      }
    }>
  }
}

export interface CreateVenueMutationVariables {
  req: CreateVenueRequest
}

export interface CreateVenueMutation {
  createVenue: {
    id: string
  }
}

export interface VenueAdminPageQuery {
  allVenues: {
    edges: Array<{
      node: {
        id: string
        name: string
        description: string
        address: {
          streetAddress: string
          postcode: string
          city: string
        }
        photo: {
          sourceUrl: string
        } | null
      }
    }>
  }
}

export interface EventFeedPageQueryVariables {
  radiusInMiles: number
  postcode: string
}

export interface EventFeedPageQuery {
  // Get feed of upcoming events for a given locaton
  eventFeed: Array<{
    id: string
    name: string
    // Return the event organiser
    organiser: {
      id: string
      name: string
    }
    // Return the event venue
    venue: {
      id: string
      name: string
      address: {
        postcode: string
      }
    }
    startTime: string
    endTime: string
    introduction: string
  }>
}

export interface EventAdminCardFragment {
  id: string
  name: string
  speakers: {
    edges: Array<{
      node: {
        id: string
        name: string
      }
    }>
  }
  // Return the event venue
  venue: {
    id: string
    name: string
  }
  startTime: string
  endTime: string
  introduction: string
  detail: string
  photo: {
    sourceUrl: string
  } | null
}

export interface OrganiserAdminCardFragment {
  id: string
  name: string
  bio: string | null
  photo: {
    sourceUrl: string
  } | null
}

export interface OrganiserListFragment {
  edges: Array<{
    node: {
      id: string
      name: string
    }
  }>
}

export interface VenueAdminCardFragment {
  id: string
  name: string
  description: string
  address: {
    streetAddress: string
    postcode: string
    city: string
  }
  photo: {
    sourceUrl: string
  } | null
}

export interface VenueListFragment {
  edges: Array<{
    node: {
      id: string
      name: string
    }
  }>
}

export interface AddressEditorFragment {
  streetAddress: string
  city: string
  postcode: string
}

export interface EventFeedCardFragment {
  id: string
  name: string
  // Return the event organiser
  organiser: {
    id: string
    name: string
  }
  // Return the event venue
  venue: {
    id: string
    name: string
    address: {
      postcode: string
    }
  }
  startTime: string
  endTime: string
  introduction: string
}
