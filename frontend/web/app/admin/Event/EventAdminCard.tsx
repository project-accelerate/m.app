import React from 'react'
import { EventAdminCardFragment } from 'frontend.web/queries'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Grid,
  Button,
} from '@material-ui/core'
import {
  MarkdownView,
  Toggle,
  DiscloseButton,
  CardImage,
} from 'frontend.web/app/common/Widgets/Widgets'
import { format } from 'date-fns'

interface EventAdminCardProps {
  event: EventAdminCardFragment
  onEdit: (event: EventAdminCardFragment) => void
}

export function EventAdminCard({ event, onEdit }: EventAdminCardProps) {
  return (
    <Card>
      <CardImage src={event.photo && event.photo.sourceUrl}>
        <Typography color="inherit" variant="headline">
          {event.name}
        </Typography>
      </CardImage>

      <CardContent>
        <Grid container direction="row" wrap="wrap" spacing={8}>
          <Grid item xs={12}>
            <Typography>
              <strong>{format(event.startTime, 'h:mma ')}</strong>
              {format(event.startTime, 'dddd Do MMMM')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      

      <Toggle>
        {({ active: detailVisible, toggle: toggleDetail }) => (
          <>
            <CardActions>
              <DiscloseButton
                disclosed={detailVisible}
                onClick={toggleDetail}
              />
            </CardActions>
            {event.detail && (
              <Collapse in={detailVisible}>
              <CardContent>
                <Typography variant="subheading">Intro:</Typography>
        <MarkdownView value={event.introduction} />
      </CardContent>
                <CardContent>
                  <Typography variant="subheading">Detail:</Typography>
                  <MarkdownView value={event.detail} />
                  <Grid container direction="row" wrap="wrap" spacing={8}>

                  <Grid item xs={12} sm={6}>
            <Typography variant="subheading">Speakers:</Typography>
            {event.speakers.edges.map(({ node: { name } }) => (
              <Typography variant="body2">{name}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subheading">Venue:</Typography>
            <Typography variant="body2">{event.venue.name}</Typography>
          </Grid>
          </Grid>
                </CardContent>
              </Collapse>
            )}
          </>
        )}
      </Toggle>
      <Button onClick={()=>onEdit(event)}>Edit</Button>
    </Card>
  )
}
