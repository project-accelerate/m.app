/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreateOrganiserRequest {
  name: string
  bio?: string | null
  photoUpload?: string | null
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
        name: string | null
        bio: string | null
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
      name: string | null
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

export interface AllOrganisersFragment {
  edges: Array<{
    node: {
      id: string
      name: string | null
      bio: string | null
      photo: {
        sourceUrl: string
      } | null
    }
  }>
}

export interface OrganiserAdminCardFragment {
  id: string
  name: string | null
  bio: string | null
  photo: {
    sourceUrl: string
  } | null
}

export interface OrganiserPickerFragment {
  id: string
  name: string | null
}

export interface EventFeedCardFragment {
  id: string
  name: string
  // Return the event organiser
  organiser: {
    id: string
    name: string | null
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
