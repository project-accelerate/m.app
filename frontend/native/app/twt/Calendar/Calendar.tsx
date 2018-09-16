import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { differenceInHours, min, max, addHours, format } from 'date-fns'
import { times } from 'lodash'
import { Typography } from '../../common/Typography/Typography'
import { theme } from '../../../theme'
import { layoutCalendar, LayoutItem } from './layoutCalendar'

export interface CalendarViewProps {
  startTime: Date
  endTime: Date
  events: CalendarEventProps[]
}

interface CalendarViewState {
  items: LayoutItem<CalendarItemElement>[]
}

export type CalendarItemElement = React.ReactElement<CalendarEventProps>

export interface CalendarEventProps {
  id: string
  title: string
  start: Date
  end: Date
  onPress: (id: string) => void
}

const PIXELS_PER_HOUR = 100

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.pallete.white,
  },
  content: {
    position: 'relative',
    marginLeft: 40,
    marginRight: theme.spacing.level(1),
  },
  itemWrapper: {
    position: 'absolute',
    width: '100%',
  },
  item: {
    height: '100%',
    backgroundColor: theme.pallete.box,
    padding: theme.spacing.level(1),
    borderLeftColor: theme.pallete.accent,
    borderLeftWidth: 3,
    marginRight: theme.spacing.level(1),
  },
  hourMark: {
    position: 'absolute',
    width: '100%',
    borderColor: theme.pallete.borderLight,
    borderBottomWidth: 1,
    height: PIXELS_PER_HOUR,
    justifyContent: 'flex-end',
  },
})

export class CalendarView extends React.Component<
  CalendarViewProps,
  CalendarViewState
> {
  static getDerivedStateFromProps({ events = [] }: CalendarViewProps) {
    const items = events.map(child => ({
      startTime: child.start,
      endTime: child.end,
      value: <CalendarEvent {...child} />,
      left: 0,
      width: 0,
    }))

    layoutCalendar(items)

    return {
      items,
    }
  }

  state: CalendarViewState = {
    items: [],
  }

  get quarterHourMarks() {
    return times((this.totalHours + 1) * 2, i => {
      return (
        <View
          key={i}
          style={[
            styles.hourMark,
            { top: i * PIXELS_PER_HOUR * 0.5 - PIXELS_PER_HOUR },
          ]}
        >
          {i % 2 == 0 && (
            <Typography variant="tiny">
              {format(addHours(this.props.startTime, i / 2), 'ha')}
            </Typography>
          )}
        </View>
      )
    })
  }

  get totalHours() {
    return differenceInHours(this.props.endTime, this.props.startTime)
  }

  get viewBounds() {
    return {
      // hack hack hack
      height: (this.totalHours + 2) * PIXELS_PER_HOUR,
    }
  }

  verticalOffset(item: CalendarEventProps) {
    return differenceInHours(item.start, this.props.startTime) * PIXELS_PER_HOUR
  }

  height(item: CalendarEventProps) {
    return differenceInHours(item.end, item.start) * PIXELS_PER_HOUR
  }

  itemBounds(item: CalendarEventProps) {
    return { top: this.verticalOffset(item), height: this.height(item) }
  }

  renderItems() {
    return this.state.items.map(item => (
      <View
        key={item.value.props.id}
        style={[
          styles.itemWrapper,
          this.itemBounds(item.value.props),
          {
            width: `${item.width * 100}%`,
            left: `${item.left * 100}%`,
          },
        ]}
      >
        {item.value}
      </View>
    ))
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.root, this.viewBounds]}>
          {this.quarterHourMarks}
          <View style={styles.content}>{this.renderItems()}</View>
        </View>
      </ScrollView>
    )
  }
}

export class CalendarEvent extends React.Component<CalendarEventProps> {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.id)}>
        <View style={styles.item}>
          <Typography variant="captionSmall">{this.props.title}</Typography>
        </View>
      </TouchableOpacity>
    )
  }
}
