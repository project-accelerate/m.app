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
  selectedType : EventType
}

export interface EventType {
  enumKey: string,
  readable:string,
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
  
  eventTypes : EventType[] = [
    {enumKey:"All",readable: 'All'},
    {enumKey:"TWT_2018",readable : 'TWT'},
    {enumKey:"LABOUR_2018",readable: 'LPC'},
  ]

 checkEventType = (activeType: string,eventType: string) : boolean => {
  console.log("Type:" + activeType)
  if (activeType == "All")
  {
    return true
  }
  else
  {
    return activeType == eventType
  }
 }

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
    selectedType: this.eventTypes[0],

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

  handleTypeChange = (selectedType: EventType) => {
    this.setState({selectedType})
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
                  eventTypeOptions = {this.eventTypes}
                  onTypeChanged ={this.handleTypeChange}
                  onDayChanged={this.handleDayChange}
                  sectionBy={this.getTimeBlock}
                  activeType={this.state.selectedType}
                  checkEventType={this.checkEventType}
                />
              )}
            </FetchEvents>
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
