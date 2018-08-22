import React from 'react'
import { NotificationAdminCardFragment } from 'frontend.web/queries'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Grid,
  CardHeader,
} from '@material-ui/core'
import {
  MarkdownView,
  Toggle,
  DiscloseButton,
  CardImage,
} from 'frontend.web/app/common/Widgets/Widgets'
import { format } from 'date-fns'
import { getConferenceNotificationScopeLabel } from 'common/domain/ConferenceNotificationScope'

interface NotificationAdminCardProps {
  notification: NotificationAdminCardFragment
}

export function NotificationAdminCard({
  notification,
}: NotificationAdminCardProps) {
  return (
    <Card>
      <CardHeader title={notification.title} />

      <CardContent>
        <Grid container direction="row" wrap="wrap" spacing={8}>
          <Grid item xs={12}>
            <Typography>
              <strong>Sent at {format(notification.timeSent, 'h:mma ')}</strong>
              {format(notification.timeSent, 'dddd Do MMMM')}
              to{' '}
              <strong>
                {getConferenceNotificationScopeLabel(notification.scope)}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">{notification.message}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
