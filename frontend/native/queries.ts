/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum EventFamily {
  LABOUR_2018 = 'LABOUR_2018',
  TWT_2018 = 'TWT_2018',
  TWT_MEETUP_2018 = 'TWT_MEETUP_2018',
}

export interface RegisterConferenceAttendanceRequest {
  user: CreateUserRequest
  device: RegisterDeviceRequest
  attendances: Array<EventFamily>
}

export interface CreateUserRequest {
  optedIntoNotifications: boolean
  email?: string | null
}

export interface RegisterDeviceRequest {
  deviceToken?: string | null
  deviceType?: DeviceType | null
}

export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export interface AttendEventMutationVariables {
  user: string
  event: string
}

export interface AttendEventMutation {
  mutateUser: {
    attendEvent: {
      user: {
        eventsAttending: Array<{
          id: string
        }>
      }
    }
  }
}

export interface CancelEventAttendanceMutationVariables {
  user: string
  event: string
}

export interface CancelEventAttendanceMutation {
  mutateUser: {
    cancelAttendance: {
      user: {
        eventsAttending: Array<{
          id: string
        }>
      }
    }
  }
}

export interface EventDetailScreenQueryVariables {
  id: string
}

export interface EventDetailScreenQuery {
  // Get an event by id
  event: {
    id: string
    name: string
    speakers: {
      edges: Array<{
        node: {
          id: string
          name: string
          photo: {
            sourceUrl: string
          } | null
        }
      }>
    }
    // Return the event venue
    venue: {
      id: string
      name: string
      address: {
        streetAddress: string
        postcode: string
        latitude: number
        longitude: number
      }
    }
    startTime: string
    endTime: string
    introduction: string
    detail: string
    photo: {
      sourceUrl: string
    } | null
  } | null
}

export interface MeetupsScreenQuery {
  events: {
    edges: Array<{
      node: {
        id: string
        name: string
        family: EventFamily
        // Return the event venue
        venue: {
          id: string
          name: string
        }
        startTime: string
        endTime: string
        photo: {
          sourceUrl: string
        } | null
      }
    }>
  }
}

export interface TimetableScreenQueryVariables {
  userId: string
}

export interface TimetableScreenQuery {
  user: {
    events: {
      edges: Array<{
        node: {
          id: string
          name: string
          family: EventFamily
          // Return the event venue
          venue: {
            id: string
            name: string
          }
          startTime: string
          endTime: string
          photo: {
            sourceUrl: string
          } | null
        }
      }>
    }
  }
}

export interface RegisterDeviceMutationVariables {
  request: RegisterConferenceAttendanceRequest
}

export interface RegisterDeviceMutation {
  registration: {
    user: {
      id: string
    }
    device: {
      id: string
    }
    attendances: Array<{
      id: string
      conference: EventFamily
    }>
  }
}

export interface CalendarEventFragment {
  id: string
  name: string
  startTime: string
  endTime: string
  photo: {
    sourceUrl: string
  } | null
  // Return the event venue
  venue: {
    name: string
  }
}

export interface EventDetailFragment {
  id: string
  name: string
  speakers: {
    edges: Array<{
      node: {
        id: string
        name: string
        photo: {
          sourceUrl: string
        } | null
      }
    }>
  }
  // Return the event venue
  venue: {
    id: string
    name: string
    address: {
      streetAddress: string
      postcode: string
      latitude: number
      longitude: number
    }
  }
  startTime: string
  endTime: string
  introduction: string
  detail: string
  photo: {
    sourceUrl: string
  } | null
}

export interface EventListItemFragment {
  id: string
  name: string
  family: EventFamily
  // Return the event venue
  venue: {
    id: string
    name: string
  }
  startTime: string
  endTime: string
  photo: {
    sourceUrl: string
  } | null
}
