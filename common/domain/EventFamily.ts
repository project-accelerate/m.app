import { never } from '../util'

export enum EventFamily {
  TWT_2018 = 'TWT_2018',
  LABOUR_2018 = 'LABOUR_2018',
  TWT_MEETUP_2018 = 'TWT_MEETUP_2018',
}

export const allEventFamilies = Object.keys(EventFamily) as EventFamily[]

export function getEventFamilyName(family: EventFamily): string {
  if (family === EventFamily.TWT_2018) {
    return 'TWT 2018'
  }

  if (family === EventFamily.LABOUR_2018) {
    return 'Labour 2018'
  }

  if (family == EventFamily.TWT_MEETUP_2018) {
    return 'TWT Meetups 2018'
  }

  return never(family)
}
