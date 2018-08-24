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
              <strong>Sent at:</strong>{' '}
              {format(notification.timeSent, 'h:mma ')}
              {format(notification.timeSent, 'dddd Do MMMM')}
              <br />
              <strong>To:</strong>{' '}
              {getConferenceNotificationScopeLabel(notification.scope)}
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
            {notification.message && (
              <Collapse in={detailVisible}>
                <CardContent>
                  <Typography variant="body1">
                    {notification.message}
                  </Typography>
                </CardContent>
              </Collapse>
            )}
          </>
        )}
      </Toggle>
    </Card>
  )
}
