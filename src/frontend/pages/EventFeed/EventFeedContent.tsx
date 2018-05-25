import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Group, LocationOn, More } from '@material-ui/icons';
import { Card } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { MenuList } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Event } from '@material-ui/icons';
import { FormattedRelative } from 'react-intl'
import { LocationPicker } from '../../components/LocationPicker/LocationPicker';
import { Typography, Grid, TextField, Paper, Input } from '@material-ui/core';
import { ValueMenuList } from '../../components/MenuList/ValueMenuList';
import { createUnderlinedDropdown } from '../../components/UnderlineDropdown/UnderlinedDropdown';

interface EventFeedContentProps  {
  events: EventFeedContentItem[]
}

export interface EventFeedContentItem {
  name: string
  organiser: {
    name: string
  }
  venue: {
    name: string
    postcode: string
  }
  startTime: string
  introduction: string
}

const style = withStyles(({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 2
  },
  icon: {
    marginRight: spacing.unit
  },
  cardItem: {
    marginTop: spacing.unit * 2
  }
}))

export const EventFeedContent = style<EventFeedContentProps>(({ events, classes }) => (
  <Grid container direction="column">
    <Grid xs={12}>
      <Toolbar>
        <Typography variant="subheading">
          Happening within <Distance value={5} /> of <Location value="BN1"/>
        </Typography>
      </Toolbar>
    </Grid>
    <Grid xs={12}>
    {
      events.map(event =>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              {event.name}
            </Typography>
            <Typography component="p" variant="subheading" color="textSecondary">
              {event.venue.name} {event.venue.postcode}<br />
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
    }
    </Grid>
  </Grid>
))

const Distance = createUnderlinedDropdown<number>({
  render: ({ value, onChange }) => (
    <ValueMenuList
      options={[1, 5, 10, 25, 50]}
      value={value}
      format={value => `${value} miles`}
      onChange={onChange}
    />
  ),
  format: value => `${value} miles`
})

const Location = createUnderlinedDropdown<string>({
  render: ({ value, onChange }) => (
    <LocationPicker value={value} onChange={onChange} />
  ),
  format: value => value
})
