import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { TimetableScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import { registration } from '../Registration/registrationState'
import TimetableScreenQueryDocument from './TimetableScreen.graphql'
import { EventListItemPressedEvent } from './EventListItem'
import { DayEventList } from './DayEventList'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { isSameDay, getHours } from 'date-fns'
import { Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { calendar } from '../Calendar/calendarState'

interface TimetableScreenState {
  selectedDate: Date
}

export interface TimeBlock {
  heading: string
  startTime: number
  endTime: number
}

const FetchEvents = createFetchData<TimetableScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

export class TimetableScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Programme',
    drawerLabel: 'Programme',
  }

  // HACK: Hardcoodeed yeah
  days = [
    new Date('2018-09-22'),
    new Date('2018-09-23'),
    new Date('2018-09-24'),
    new Date('2018-09-25'),
  ]

  getTimeBlock = (startTime: string) => {
    for (var i = 0; i < this.timeBlocks.length; i++) {
      if (
        getHours(startTime) >= this.timeBlocks[i].startTime &&
        getHours(startTime) < this.timeBlocks[i].endTime
      ) {
        return this.timeBlocks[i]
      }
    }
    return this.timeBlocks[this.timeBlocks.length - 1]
  }

  // HACK: Hardcoodeed yeah
  timeBlocks: TimeBlock[] = [
    {
      heading: 'Morning',
      startTime: calendar.startHourOfDay,
      endTime: calendar.morningEnd,
    },
    {
      heading: 'Afternoon',
      startTime: calendar.startHourOfDay,
      endTime: calendar.afternoonEnd,
    },
    {
      heading: 'Evening to late',
      startTime: calendar.afternoonEnd,
      endTime: calendar.startHourOfDay,
    },
  ]

  state: TimetableScreenState = {
    selectedDate:
      this.days.find(day => isSameDay(day, new Date())) || this.days[0],
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    this.props.navigation.push(Routes.get().getRoutename('EventDetailScreen'), {
      id: event.id,
      title: event.name,
      image: event.photo && event.photo.sourceUrl,
    })
  }

  handleDayChange = (selectedDate: Date) => {
    this.setState({ selectedDate })
  }

  render() {
    return (
      <BasicScreen>
        <Connect>
          {({ userId }) => (
            <FetchEvents variables={{ userId }}>
              {({ data }) => (
                <DayEventList
                  activeDay={this.state.selectedDate}
                  data={data.user.events}
                  onEventPress={this.handleEventPressed}
                  dayOptions={this.days}
                  onDayChanged={this.handleDayChange}
                  sectionBy={this.getTimeBlock}
                />
              )}
            </FetchEvents>
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
