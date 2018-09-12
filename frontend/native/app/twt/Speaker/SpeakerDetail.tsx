import React from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { ProfileImage, Banner, Grid } from '../../common/Widgets/Widgets'
import { Typography } from '../../common/Typography/Typography'
import { SpeakerDetailFragment, EventListItemFragment } from '../../../queries'
import { theme } from '../../../theme'
import {
  EventListItem,
  EventListItemPressedEvent,
} from '../Event/EventListItem'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from '../../common/Butttons/Buttons'
import { Linking } from 'react-native'

interface SpeakerDetailPageProps {
  speaker: SpeakerDetailFragment
  events: EventListItemFragment[]
  onEventPress: (event: EventListItemPressedEvent) => void
  onTwitterPress: (handle: TwitterHandlePressedEvent) => void
}

export interface TwitterHandlePressedEvent {
  handle: string | null
}

export interface SpeakerDetailSpeakerPressEvent {
  speaker: {
    id: string
    name: string
  }
}

const style = StyleSheet.create({
  banner: {
    padding: theme.spacing.level(1),
    color: theme.pallete.white,
    backgroundColor: theme.pallete.accent,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.level(2),
    padding: theme.spacing.level(1),
    borderTopColor: theme.pallete.accent,
    borderTopWidth: 2,
  },
  content: {
    marginHorizontal: theme.spacing.level(1),
    marginBottom: theme.spacing.level(2),
  },
  container: {},
  intro: {
    color: theme.pallete.black,
  },
  speakerName: {
    color: theme.pallete.white,
  },
  heading: {
    color: theme.pallete.accent,
    width: '100%',
    padding: theme.spacing.level(1),
    marginTop: theme.spacing.level(2),
  },
  venue: {
    padding: theme.spacing.level(1),
    marginBottom: theme.spacing.level(2),
    color: theme.pallete.white,
    backgroundColor: theme.pallete.contrast,
  },
  divider: {
    borderColor: theme.pallete.accent,
    borderWidth: 1,
  },
  last: {
    marginBottom: theme.spacing.level(3),
  },
})

export function SpeakerDetail({
  speaker,
  events,
  onEventPress,
  onTwitterPress,
}: SpeakerDetailPageProps) {
  return (
    <View style={style.container}>
      {
        <View style={style.header}>
          {speaker.twitterHandle && (
            <Button
              variant="inline"
              icon="twitter"
              onPress={() => onTwitterPress({ handle: speaker.twitterHandle })}
            >
              {speaker.twitterHandle}
            </Button>
          )}
        </View>
      }

      <Typography style={style.content} variant="primary">
        {speaker.bio}
      </Typography>

      <Typography style={style.heading} variant="display">
        Events
      </Typography>

      {events.map((eventFrag, i) => (
        <EventListItem
          key={i}
          event={eventFrag}
          onPress={() => onEventPress({ event: eventFrag })}
        />
      ))}
    </View>
  )
}
