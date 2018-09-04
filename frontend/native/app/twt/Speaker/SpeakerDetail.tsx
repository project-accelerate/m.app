import React from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { ProfileImage, Banner, Grid } from '../../common/Widgets/Widgets'
import { Typography } from '../../common/Typography/Typography'
import { SpeakerDetailFragment, EventListItemFragment } from '../../../queries'
import { theme } from '../../../theme'
import { EventListItem, EventListItemPressedEvent } from '../Event/EventListItem';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from '../../common/Butttons/Buttons'
import { Linking } from 'react-native';

interface SpeakerDetailPageProps {
  speaker: SpeakerDetailFragment
  events: EventListItemFragment []
  onEventPress:(event: EventListItemPressedEvent) => void
  onTwitterPress:(handle: TwitterHandlePressedEvent) => void
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

export function SpeakerDetail({
  speaker, events, onEventPress, onTwitterPress
}: SpeakerDetailPageProps) {
  return (
    <ScrollView>
      <ProfileImage image={speaker.photo} size="halfScreen">
        <Banner>
          <Typography style={style.speakerName} variant="cardTitle">
            {speaker.name}
          </Typography>
        </Banner>
      </ProfileImage>
      <Typography style={style.heading} variant="display">
      Profile
      </Typography>
      <Typography style={style.content} variant="display">
      {speaker.bio}
      </Typography>
      {speaker.twitterHandle != null &&
      <TouchableOpacity onPress={()=>onTwitterPress({handle:speaker.twitterHandle})}>
        <Typography style={style.heading} variant="display">
         <FontAwesome
      name="twitter"
      color="blue"
      size={26}
      />
        {speaker.twitterHandle}
        </Typography>
        </TouchableOpacity>
        
      }
      
              
          
      <Typography style={style.heading} variant="display">
      Events
      </Typography>
      <Grid style={style.header}>
      {events.map((eventFrag,i) => <EventListItem key={i} event={eventFrag} onPress={()=>onEventPress({event:eventFrag})} />)}
      </Grid>
    </ScrollView>
  )
}

