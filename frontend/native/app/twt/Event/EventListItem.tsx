import React from 'react'
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { EventListItemFragment } from '../../../queries'
import { theme } from '../../../theme'
import { Typography } from '../../common/Typography/Typography'
import { format } from 'date-fns'
import { ProfileImage } from '../../common/Widgets/Widgets'

const EventListItemStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.cardBg,
    flexDirection: 'row',
    padding: theme.spacing.level(1),
  },
  text: {
    paddingLeft: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.33,
  },
  image: {},
})

interface EventListItemProps {
  event: EventListItemFragment
  onPress: (event: EventListItemPressedEvent) => void
}

export interface EventListItemPressedEvent {
  event: EventListItemFragment
}

export function EventListItem({ event, onPress }: EventListItemProps) {
  return (
    <TouchableNativeFeedback onPress={() => onPress({ event })}>
      <View style={EventListItemStyle.container}>
        <ProfileImage style={EventListItemStyle.image} image={event.photo} />

        <View style={EventListItemStyle.text}>
          <Typography variant="cardTitle" style={EventListItemStyle.text}>
            {event.name}
          </Typography>

          <Typography style={EventListItemStyle.text}>
            {event.venue.name}
          </Typography>

          <Typography variant="accent" style={EventListItemStyle.text}>
            {format(event.startTime, 'h:mma')} -{' '}
            {format(event.endTime, 'h:mma')}
          </Typography>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}
