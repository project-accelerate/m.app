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
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

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
      {organiser.photo && <CardMedia src={organiser.photo.sourceUrl} />}

      <CardContent>
        <Typography variant="title">{organiser.name}</Typography>
      </CardContent>

      <CardActions>
        <IconButton onClick={() => onEdit(organiser)}>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  )
}
