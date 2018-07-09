import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { EventDetailScreen } from './app/twt/Event/EventDetailScreen'

export const routes = {
  Home: {
    screen: HomeScreen,
  },
  Timetable: {
    screen: TimetableScreen,
  },
  EventDetail: {
    screen: EventDetailScreen,
  },
}

export function getRoutename(key: keyof typeof routes) {
  return key
}
