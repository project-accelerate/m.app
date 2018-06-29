import React from 'react'
import { VenueAdminCardFragment } from 'frontend.web/queries'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  Grid,
} from '@material-ui/core'
import { Edit, ExpandMore } from '@material-ui/icons'
import {
  MarkdownView,
  Toggle,
  DiscloseButton,
  CardImage,
} from 'frontend.web/app/common/Widgets/Widgets'

interface VenueAdminCardProps {
  venue: VenueAdminCardFragment
  onEdit: (venue: VenueAdminCardFragment) => void
}

export function VenueAdminCard({ venue, onEdit }: VenueAdminCardProps) {
  return (
    <Card>
      <CardImage src={venue.photo && venue.photo.sourceUrl}>
        <Typography color="inherit" variant="headline">
          {venue.name}
        </Typography>
      </CardImage>

      <CardContent>
        <Grid container direction="row" wrap="wrap" spacing={8}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>{venue.address.streetAddress}</strong>{' '}
              {venue.address.postcode}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <Toggle>
        {({ active: descriptionVisible, toggle: toggleBio }) => (
          <>
            <CardActions>
              <DiscloseButton
                disclosed={descriptionVisible}
                onClick={toggleBio}
              />
            </CardActions>
            {venue.description && (
              <Collapse in={descriptionVisible}>
                <CardContent>
                  <MarkdownView value={venue.description} />
                </CardContent>
              </Collapse>
            )}
          </>
        )}
      </Toggle>
    </Card>
  )
}
