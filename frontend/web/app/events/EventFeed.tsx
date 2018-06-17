import * as React from 'react'
import { withStyles, Paper } from '@material-ui/core'
import { CardHeader, CardContent, CardActions } from '@material-ui/core'
import { Group, LocationOn, More } from '@material-ui/icons'
import { Card } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { MenuList } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Event } from '@material-ui/icons'
import { FormattedRelative } from 'react-intl'
import { Typography, Grid, TextField } from '@material-ui/core'
import { LocationPicker } from '../common/LocationPicker/LocationPicker'
import { EventFeedCardFragment } from '../../queries'
import { ValueMenuList } from '../common/MenuList/ValueMenuList'
import { createUnderlinedDropdown } from '../common/UnderlineDropdown/UnderlinedDropdown'
import { EventFeedCard } from './EventFeedCard'
import { contentWidth } from '../common/Layouts'

const style = withStyles(({ palette, spacing }) => ({
  root: {
    minHeight: '100%',
    background: `url(${require('./feedBackground.jpg')}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    backgroundPositionX: 'left',
    backgroundPositionY: 'bottom',
  },
  toolbar: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: spacing.unit * 2,
    flexDirection: 'row' as any,
    justifyContent: 'center',
  },
  toolbarContent: {
    flex: 1,
    maxWidth: contentWidth,
  },
  feed: {
    alignSelf: 'center',
    maxWidth: contentWidth,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    padding: spacing.unit * 3,
  },
}))

interface EventFeedProps {
  events: EventFeedCardFragment[]
}

export const EventFeed = style<EventFeedProps>(function EventFeed({
  events,
  classes,
}) {
  return (
    <Grid className={classes.feed} xs={12}>
      {events.map(event => <EventFeedCard {...event} />)}
    </Grid>
  )
})

export const EventFeedContainer = style(function EventFeedContainer({
  children,
  classes,
}) {
  return (
    <Grid className={classes.root} container direction="column">
      {children}
    </Grid>
  )
})

interface EventFeedSearchbarProps {
  postcode: string
  radiusInMiles: number
  onPostcodeChange: (postcode: string) => void
  onRadiusChange: (radiusInMiles: number) => void
}

export const EventFeedSearchbar = style<EventFeedSearchbarProps>(
  function EventFeedSearchbar({
    classes,
    postcode,
    radiusInMiles,
    onPostcodeChange,
    onRadiusChange,
  }) {
    return (
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.toolbarContent} variant="subheading">
          {'Happening within '}
          <Distance value={radiusInMiles} onChange={onRadiusChange} />
          {' of '}
          <Location value={postcode} onChange={onPostcodeChange} />
        </Typography>
      </Toolbar>
    )
  },
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
  },
)

export function EventFeedEmptyContent() {
  return <Typography />
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
  format: value => `${value} miles`,
})

const Location = createUnderlinedDropdown<string>({
  render: ({ value, onChange }) => (
    <LocationPicker value={value} onChange={onChange} />
  ),
  format: value => value,
})
