/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface EventPageQueryVariables {
  eventId: string,
};

export interface EventPageQuery {
  // Get an event by id
  event:  {
    id: string,
    name: string,
  } | null,
};

export interface EventDetailFragment {
  id: string,
  name: string,
};
