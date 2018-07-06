/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum EventFamily {
  LABOUR_2018 = 'LABOUR_2018',
  TWT_2018 = 'TWT_2018',
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
