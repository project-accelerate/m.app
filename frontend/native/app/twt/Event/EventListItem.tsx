import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  StyleProp,
  ImageStyle,
} from 'react-native'
import { EventListItemFragment } from '../../../queries'
import { theme } from '../../../theme'
import { Typography } from '../../common/Typography/Typography'
import { format } from 'date-fns'

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
}

export function EventListItem({ event }: EventListItemProps) {
  return (
    <TouchableNativeFeedback>
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

const ProfileImageStyle = StyleSheet.create({
  small: {
    width: 96,
    height: 96,
  },
})

interface ProfileImageProps {
  style?: StyleProp<ImageStyle>
  size?: keyof typeof ProfileImageStyle
  image: { sourceUrl: string } | number | null
}

function ProfileImage({ style, image, size = 'small' }: ProfileImageProps) {
  if (!image) {
    return null
  }

  return (
    <Image
      style={[style, ProfileImageStyle[size]]}
      source={
        typeof image === 'number'
          ? image
          : { cache: 'force-cache', uri: image.sourceUrl }
      }
    />
  )
}
