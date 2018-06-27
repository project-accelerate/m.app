import React from 'react'
import { OrganiserAdminCardFragment } from 'frontend.web/queries'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from '@material-ui/core'
import { Edit, ExpandMore } from '@material-ui/icons'
import {
  MarkdownView,
  Toggle,
  DiscloseButton,
  CardImage,
} from 'frontend.web/app/common/Widgets/Widgets'

interface OrganiserAdminCardProps {
  organiser: OrganiserAdminCardFragment
  onEdit: (organiser: OrganiserAdminCardFragment) => void
}

export function OrganiserAdminCard({
  organiser,
  onEdit,
}: OrganiserAdminCardProps) {
  return (
    <Card>
      <CardImage src={organiser.photo && organiser.photo.sourceUrl}>
        <Typography color="inherit" variant="headline">
          {organiser.name}
        </Typography>
      </CardImage>

      <Toggle>
        {({ active: bioVisible, toggle: toggleBio }) => (
          <>
            <CardActions>
              <DiscloseButton disclosed={bioVisible} onClick={toggleBio} />
            </CardActions>
            {organiser.bio && (
              <Collapse in={bioVisible}>
                <CardContent>
                  <MarkdownView value={organiser.bio} />
                </CardContent>
              </Collapse>
            )}
          </>
        )}
      </Toggle>
    </Card>
  )
}
