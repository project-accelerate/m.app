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
  TWT = "TWT",
  VOTE = "VOTE",
}


export interface EditEventRequest {
  id: string,
  name?: string | null,
  speakers?: Array< string > | null,
  venue?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  introduction?: string | null,
  detail?: string | null,
  family?: EventFamily | null,
  photoUpload?: string | null,
};

export enum ConferenceNotificationScope {
  DELEGATES = "DELEGATES",
  EVERYONE = "EVERYONE",
  TWT_ONLY = "TWT_ONLY",
}


export interface ConferenceNotificationSendRequest {
  title: string,
  message: string,
  detail: string,
  urgent: boolean,
  link?: string | null,
  associatedEventId?: string | null,
  scope: ConferenceNotificationScope,
};

export interface CreatePersonRequest {
  name: string,
  bio?: string | null,
  twitterHandle?: string | null,
  photoUpload?: string | null,
};

export interface EditPersonRequest {
  id: string,
  name: string,
  bio?: string | null,
  twitterHandle?: string | null,
  photoUpload?: string | null,
};

export interface CreateVenueRequest {
  name: string,
  description: string,
  photoUpload?: string | null,
  address: AddressInput,
};

export interface AddressInput {
  streetAddress?: string | null,
  city?: string | null,
  postcode?: string | null,
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

export interface EditEventMutationVariables {
  req: EditEventRequest,
};

export interface EditEventMutation {
  // Edit an event
  editEvent: boolean,
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

export interface NotificationAdminPageQuery {
  events:  {
    edges:  Array< {
      node:  {
        id: string,
        name: string,
      },
    } >,
  },
  sentNotifications:  {
    edges:  Array< {
      node:  {
        id: string,
        timeSent: string,
        title: string,
        message: string,
        scope: ConferenceNotificationScope,
      },
    } >,
  },
};

export interface CreateNotificationMutationVariables {
  req: ConferenceNotificationSendRequest,
};

export interface CreateNotificationMutation {
  sendConferenceNotification: boolean,
};

export interface CreatePersonMutationVariables {
  req: CreatePersonRequest,
};

export interface CreatePersonMutation {
  createPerson:  {
    id: string,
  },
};

export interface EditPersonMutationVariables {
  req: EditPersonRequest,
};

export interface EditPersonMutation {
  // Edit an event
  editPerson: boolean,
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
        twitterHandle: string | null,
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
          streetAddress: string | null,
          postcode: string | null,
          city: string | null,
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
        postcode: string | null,
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

export interface NotificationAdminCardFragment {
  id: string,
  timeSent: string,
  title: string,
  message: string,
  scope: ConferenceNotificationScope,
};

export interface NotificationListFragment {
  edges:  Array< {
    node:  {
      id: string,
      name: string,
    },
  } >,
};

export interface PersonAdminCardFragment {
  id: string,
  name: string,
  bio: string | null,
  photo:  {
    sourceUrl: string,
  } | null,
  twitterHandle: string | null,
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
    streetAddress: string | null,
    postcode: string | null,
    city: string | null,
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
  streetAddress: string | null,
  city: string | null,
  postcode: string | null,
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
      postcode: string | null,
    },
  },
  startTime: string,
  endTime: string,
  introduction: string,
};
