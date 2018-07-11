/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum EventFamily {
  LABOUR_2018 = 'LABOUR_2018',
  TWT_2018 = 'TWT_2018',
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

export interface TimetableScreenQuery {
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
