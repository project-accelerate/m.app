import { never } from '../util'

export enum EventFamily {
  TWT_2018 = 'TWT_2018',
  LABOUR_2018_VOTE = 'LABOUR_2018_VOTE',
  LABOUR_2018 = 'LABOUR_2018',
}

export const allEventFamilies = Object.keys(EventFamily) as EventFamily[]

export function getEventFamilyName(family: EventFamily): string {
  if (family === EventFamily.TWT_2018) {
    return 'TWT'
  }

  if (family === EventFamily.LABOUR_2018) {
    return 'Labour Conference Event'
  }

  if (family === EventFamily.LABOUR_2018_VOTE) {
    return 'Vote'
  }

  return never(family)
}
