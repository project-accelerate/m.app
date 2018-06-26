/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface EventFeedPageQueryVariables {
  radiusInMiles: number,
  postcode: string,
};

export interface EventFeedPageQuery {
  // Get feed of upcoming events for a given locaton
  eventFeed:  Array< {
    id: string,
    name: string,
    // Return the event organiser
    organiser:  {
      id: string,
      name: string,
    },
    // Return the event venue
    venue:  {
      id: string,
      name: string,
      postcode: string,
    },
    startTime: string,
    endTime: string,
    introduction: string,
  } >,
};

export interface EventFeedCardFragment {
  id: string,
  name: string,
  // Return the event organiser
  organiser:  {
    id: string,
    name: string,
  },
  // Return the event venue
  venue:  {
    id: string,
    name: string,
    postcode: string,
  },
  startTime: string,
  endTime: string,
  introduction: string,
};
