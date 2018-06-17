import * as React from 'react'
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'
import { FormattedRelative } from 'react-intl'
import { More, Event } from '@material-ui/icons'
import { EventFeedCardFragment } from '../../queries'

interface EventFeedCardProps extends EventFeedCardFragment {}

const style = withStyles(({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 2,
    opacity: 0.95,
  },
  icon: {
    marginRight: spacing.unit,
  },
  cardItem: {
    marginTop: spacing.unit * 2,
  },
}))

export const EventFeedCard = style<EventFeedCardProps>(function EventFeedCard({
  classes,
  ...event
}) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {event.name}
        </Typography>
        <Typography component="p" variant="subheading" color="textSecondary">
          {event.venue.name} {event.venue.postcode}
          <br />
          <FormattedRelative value={event.startTime} />
        </Typography>
        <Typography className={classes.cardItem} component="p">
          {event.introduction}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button size="small">
          <More className={classes.icon} />
          More Info
        </Button>
        <Button size="small">
          <Event className={classes.icon} />
          Save
        </Button>
      </CardActions>
    </Card>
  )
})
