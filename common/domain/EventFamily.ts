import { never } from '../util'

export enum EventFamily {
  TWT = 'TWT',
  VOTE = 'VOTE'
}

export const allEventFamilies = Object.keys(EventFamily) as EventFamily[]

export function getEventFamilyName(family: EventFamily): string {
  if (family === EventFamily.TWT) {
    return 'TWT'
  }

  if (family === EventFamily.VOTE) {
    return 'Vote'
  }

  return never(family)
}
