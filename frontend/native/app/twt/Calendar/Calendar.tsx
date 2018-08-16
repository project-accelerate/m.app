import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
  differenceInHours,
  min,
  max,
  addHours,
  format,
  startOfDay,
} from 'date-fns'
import { times } from 'lodash'
import { Typography } from '../../common/Typography/Typography'
import { theme } from '../../../theme'

interface CalendarViewProps {
  startTime: Date
  endTime: Date
  children?: React.ReactElement<CalendarEventProps>[]
}

interface CalendarViewState {
  clashGroups: string[][]
}

const PIXELS_PER_HOUR = 100

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    marginVertical: theme.spacing.level(5),
  },
  content: {
    position: 'relative',
    marginLeft: 40,
    marginRight: theme.spacing.level(1),
  },
  itemWrapper: {
    position: 'absolute',
    width: '100%',
    borderColor: theme.pallete.black,
    borderWidth: 2,
    // marginHorizontal: theme.spacing.level(1)
  },
  item: {
    height: '100%',
    backgroundColor: theme.pallete.accent,
    padding: theme.spacing.level(1),
  },
  hourMark: {
    position: 'absolute',
    width: '100%',
    borderColor: theme.pallete.white,
    borderBottomWidth: 1,
    height: PIXELS_PER_HOUR,
    justifyContent: 'flex-end',
  },
})

export class CalendarView extends React.Component<
  CalendarViewProps,
  CalendarViewState
> {
  static getDerivedStateFromProps({ children = [] }: CalendarViewProps) {
    return {
      clashGroups: calculateClashes({
        items: children.map(c => c.props),
      }),
    }
  }

  state: CalendarViewState = CalendarView.getDerivedStateFromProps(this.props)

  get hourMarks() {
    return times(this.totalHours + 1, i => {
      return (
        <View
          key={i}
          style={[
            styles.hourMark,
            { top: i * PIXELS_PER_HOUR - PIXELS_PER_HOUR },
          ]}
        >
          <Typography variant="caption">
            {format(addHours(this.props.startTime, i), 'ha')}
          </Typography>
        </View>
      )
    })
  }

  get totalHours() {
    return differenceInHours(this.props.endTime, this.props.startTime)
  }

  get viewBounds() {
    return {
      height: this.totalHours * PIXELS_PER_HOUR,
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
    if (!this.props.children) {
      return undefined
    }

    return this.props.children.map(item => (
      <View
        key={item.props.id}
        style={[styles.itemWrapper, this.itemBounds(item.props)]}
      >
        {item}
      </View>
    ))
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.root, this.viewBounds]}>
          {this.hourMarks}
          <View style={styles.content}>{this.renderItems()}</View>
        </View>
      </ScrollView>
    )
  }
}

interface CalendarEventProps {
  id: string
  title: string
  start: Date
  end: Date
  onPress: (id: string) => void
}

export class CalendarEvent extends React.Component<CalendarEventProps> {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.id)}>
        <View style={styles.item}>
          <Typography>{this.props.title}</Typography>
        </View>
      </TouchableOpacity>
    )
  }
}

/** HACK: n^2 is probably fine here? */
function calculateClashes(props: { items: CalendarEventProps[] }) {
  const groups: string[][] = []
  const existing = new Map<string, number>()

  props.items.forEach(item => {
    props.items.forEach(potential => {
      if (clashes(item, potential)) {
        const existingGroup = existing.get(potential.id)
        const group =
          typeof existingGroup === 'undefined' ? groups.length : existingGroup

        existing.set(item.id, group)
        existing.set(potential.id, group)

        const members = groups[group] || []
        groups[group] = [...members, item.id]
      }
    })
  })

  return groups
}

function clashes(a: CalendarEventProps, b: CalendarEventProps) {
  return a.start <= b.end && a.end >= b.start
}
