/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreateEventRequest {
  name: string,
  speakers: Array< string >,
  venue: string,
  startTime: string,
  endTime: string,
  introduction: string,
  detail: string,
  family: EventFamily,
  photoUpload?: string | null,
};

export enum EventFamily {
  LABOUR_2018 = "LABOUR_2018",
  TWT_2018 = "TWT_2018",
}


export interface CreatePersonRequest {
  name: string,
  bio?: string | null,
  photoUpload?: string | null,
};

export interface CreateVenueRequest {
  name: string,
  description: string,
  photoUpload?: string | null,
  address: AddressInput,
};

export interface AddressInput {
  streetAddress: string,
  city: string,
  postcode: string,
};

export interface CreateEventMutationVariables {
  req: CreateEventRequest,
};

export interface CreateEventMutation {
  // Submit a new event
  createEvent:  {
    id: string,
  },
};

export interface EventAdminPageQuery {
  venueOptions:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
      },
    } >,
  },
  speakerOptions:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
      },
    } >,
  },
  allEvents:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
        family: EventFamily,
        speakers:  {
          edges:  Array< {
            node:  {
              id: string,
              name: string,
            },
          } >,
        },
        // Return the event venue
        venue:  {
          id: string,
          name: string,
        },
        startTime: string,
        endTime: string,
        introduction: string,
        detail: string,
        photo:  {
          sourceUrl: string,
        } | null,
      },
    } >,
  },
};

export interface CreatePersonMutationVariables {
  req: CreatePersonRequest,
};

export interface CreatePersonMutation {
  createPerson:  {
    id: string,
  },
};

export interface PersonAdminPageQuery {
  allPeople:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
        bio: string | null,
        photo:  {
          sourceUrl: string,
        } | null,
      },
    } >,
  },
};

export interface CreateVenueMutationVariables {
  req: CreateVenueRequest,
};

export interface CreateVenueMutation {
  createVenue:  {
    id: string,
  },
};

export interface VenueAdminPageQuery {
  allVenues:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
        description: string,
        address:  {
          streetAddress: string,
          postcode: string,
          city: string,
        },
        photo:  {
          sourceUrl: string,
        } | null,
      },
    } >,
  },
};

export interface EventFeedPageQueryVariables {
  radiusInMiles: number,
  postcode: string,
};

export interface EventFeedPageQuery {
  // Get feed of upcoming events for a given locaton
  eventFeed:  Array< {
    id: string,
    name: string,
    family: EventFamily,
    // Return the event venue
    venue:  {
      id: string,
      name: string,
      address:  {
        postcode: string,
      },
    },
    startTime: string,
    endTime: string,
    introduction: string,
  } >,
};

export interface EventAdminCardFragment {
  id: string,
  name: string,
  family: EventFamily,
  speakers:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
      },
    } >,
  },
  // Return the event venue
  venue:  {
    id: string,
    name: string,
  },
  startTime: string,
  endTime: string,
  introduction: string,
  detail: string,
  photo:  {
    sourceUrl: string,
  } | null,
};

export interface PersonAdminCardFragment {
  id: string,
  name: string,
  bio: string | null,
  photo:  {
    sourceUrl: string,
  } | null,
};

export interface PersonListFragment {
  edges:  Array< {
    node:  {
      id: string,
      name: string,
    },
  } >,
};

export interface VenueAdminCardFragment {
  id: string,
  name: string,
  description: string,
  address:  {
    streetAddress: string,
    postcode: string,
    city: string,
  },
  photo:  {
    sourceUrl: string,
  } | null,
};

export interface VenueListFragment {
  edges:  Array< {
    node:  {
      id: string,
      name: string,
    },
  } >,
};

export interface AddressEditorFragment {
  streetAddress: string,
  city: string,
  postcode: string,
};

export interface EventFeedCardFragment {
  id: string,
  name: string,
  family: EventFamily,
  // Return the event venue
  venue:  {
    id: string,
    name: string,
    address:  {
      postcode: string,
    },
  },
  startTime: string,
  endTime: string,
  introduction: string,
};
