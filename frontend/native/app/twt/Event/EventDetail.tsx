import React from 'react'
import { MapView } from 'expo'
import { TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native'
import { ProfileImage, Banner, Grid } from '../../common/Widgets/Widgets'
import { Typography, Markdown, Br } from '../../common/Typography/Typography'
import { EventDetailFragment } from '../../../queries'
import { theme } from '../../../theme'
import { timeOf, longDateOf } from '../../common/date-formats'

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

const style = StyleSheet.create({
  banner: {
    padding: theme.spacing.level(1),
    color: theme.pallete.white,
    backgroundColor: theme.pallete.accent,
  },
  header: {
    marginBottom: theme.spacing.level(2),
    backgroundColor: theme.pallete.accent,
  },
  content: {
    marginHorizontal: theme.spacing.level(1),
    marginBottom: theme.spacing.level(2),
  },
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

export function EventDetail({ event, onSpeakerPress }: EventDetailPageProps) {
  return (
    <ScrollView>
      <ProfileImage image={event.photo} size="halfScreen">
        <Banner>
          <Typography style={style.speakerName} variant="cardTitle">
            {event.name}
          </Typography>
        </Banner>
      </ProfileImage>

      <Grid style={style.header}>
        <Typography darkBg variant="accent2">
          {longDateOf(event.startTime)} {timeOf(event.startTime)} -{' '}
          {timeOf(event.endTime)}
        </Typography>

        <Typography darkBg variant="accent">
          {event.venue.name}
        </Typography>
      </Grid>

      <Markdown style={style.content} value={event.introduction} />

      <Typography style={style.heading} variant="display">
        Speakers
      </Typography>

      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {event.speakers.edges.map(speaker => (
          <TouchableOpacity
            key={speaker.node.id}
            onPress={() => onSpeakerPress({ speaker: speaker.node })}
          >
            <ProfileImage size="halfSquare" image={speaker.node.photo}>
              <Banner>
                <Typography style={style.speakerName} variant="body">
                  {speaker.node.name}
                </Typography>
              </Banner>
            </ProfileImage>
          </TouchableOpacity>
        ))}
      </View>

      <Typography style={style.heading} variant="display">
        Venue
      </Typography>

      <MapView
        style={{ height: 300 }}
        region={{
          latitude: event.venue.address.latitude,
          longitude: event.venue.address.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <MapView.Marker
          coordinate={event.venue.address}
          title={event.venue.name}
        />
      </MapView>

      <Typography style={style.venue} variant="caption">
        {event.venue.name}
        <Br />
        {event.venue.address.streetAddress}, {event.venue.address.postcode}
      </Typography>

      <Typography style={style.heading} variant="display">
        About The Event
      </Typography>

      <Markdown style={[style.content, style.last]} value={event.detail} />
    </ScrollView>
  )
}
