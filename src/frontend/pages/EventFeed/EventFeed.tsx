import * as React from 'react'
import { withStyles, Paper } from '@material-ui/core';
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
import { Typography, Grid, TextField } from '@material-ui/core';
import { ValueMenuList } from '../../components/MenuList/ValueMenuList';
import { createUnderlinedDropdown } from '../../components/UnderlineDropdown/UnderlinedDropdown';
import { EventFeedCardFragment } from '../../queries';
import { EventFeedCard } from './EventFeedCard';

const style = withStyles(({ palette, spacing }) => ({
  root: {
    minHeight: '100%',
    backgroundImage: `url(${require('./emptyState.jpg')})`,
    backgroundSize: 'cover',
    backgroundPositionX: 'left',
    backgroundPositionY: 'bottom',
  },
  toolbar: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    padding: spacing.unit * 3
  }
}))

interface EventFeedProps  {
  events: EventFeedCardFragment[]
}

export function EventFeed({ events }: EventFeedProps) {
  return (
    <Grid xs={12}>
    {
      events.map(event =>
        <EventFeedCard
          {...event}
        />
      )
    }
    </Grid>
  )
}

export const EventFeedContainer = style(
  function EventFeedContainer({ children, classes }) {
    return (
      <Grid className={classes.root} container direction="column">
        {children}
      </Grid>
    )
  }
)

interface EventFeedSearchbarProps {
  postcode: string
  radiusInMiles: number
  onPostcodeChange: (postcode: string) => void
  onRadiusChange: (radiusInMiles: number) => void
}

export const EventFeedSearchbar = style<EventFeedSearchbarProps>(
  function EventFeedSearchbar({ classes, postcode, radiusInMiles, onPostcodeChange, onRadiusChange }) {
    return (
      <Grid xs={12}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="subheading">
            {'Happening within '}
            <Distance value={radiusInMiles} onChange={onRadiusChange} />
            {' of '}
            <Location value={postcode} onChange={onPostcodeChange} />
          </Typography>
        </Toolbar>
      </Grid>
    )
  }
)

interface EventFeedInitialContentProps {
  onSearch: (location: string) => void
}

export const EventFeedInitialContent = style<EventFeedInitialContentProps>(
  function EventFeedInitialContent({ classes, onSearch }) {
    return (
      <Grid className={classes.emptyWrapper} container xs={12}>
        <Paper className={classes.empty}>
          <Typography gutterBottom variant="title" align="center">
            Find People
          </Typography>
          <Typography variant="body1" align="center">
            Find meetup groups, unions and momentum events near to you
          </Typography>
          <LocationPicker value="" onChange={onSearch} />
        </Paper>
      </Grid>
    )
  }
)

export function EventFeedEmptyContent() {
  return (
    <Typography>
    </Typography>
  )
}

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
