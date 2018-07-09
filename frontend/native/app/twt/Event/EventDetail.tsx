import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ProfileImage, Banner, Grid } from '../../common/Widgets/Widgets'
import { Typography, Paragraphs } from '../../common/Typography/Typography'
import { EventDetailFragment } from '../../../queries'

interface EventDetailPageProps {
  event: EventDetailFragment
  onSpeakerPress: (event: EventDetailSpeakerPressEvent) => void
}

export interface EventDetailSpeakerPressEvent {
  speaker: {
    id: string
    name: string
  }
}

export function EventDetail({ event, onSpeakerPress }: EventDetailPageProps) {
  return (
    <View>
      <ProfileImage image={event.photo} size="fullWidth">
        <Banner>
          <Typography variant="cardTitle">{event.name}</Typography>
        </Banner>
      </ProfileImage>

      <Typography variant="subtitle">Speakers</Typography>

      <Grid>
        {event.speakers.edges.map(speaker => (
          <TouchableOpacity
            onPress={() => onSpeakerPress({ speaker: speaker.node })}
          >
            <ProfileImage size="small" image={speaker.node.photo} />

            <Typography variant="accent">{speaker.node.name}</Typography>
          </TouchableOpacity>
        ))}
      </Grid>

      <Paragraphs>
        {event.introduction}
        {event.detail}
      </Paragraphs>
    </View>
  )
}
