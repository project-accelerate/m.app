import React from 'react'
import { AdminCrudView } from 'frontend.web/app/admin/common/AdminCrudView/AdminCrudView'
import { createDataLoader } from 'frontend.web/app/common/LoadData/LoadData'
import {
  NotificationAdminPageQuery,
  ConferenceNotificationSendRequest,
} from 'frontend.web/queries'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { NotificationAdminCard } from 'frontend.web/app/admin/Notification/NotificationAdminCard'
import { EditNotificationForm } from 'frontend.web/app/admin/Notification/EditNotificationForm'
import { Main } from 'frontend.web/app/common/Layouts'

interface NotificationAdminPageProps {
  client: ApolloClient<{}>
}

export const NotificationAdminPage = withApollo(
  class NotificationAdminPage extends React.Component<
    NotificationAdminPageProps
  > {
    handleRequestAdd = async (req: ConferenceNotificationSendRequest) => {
      await this.props.client.mutate({
        mutation: require('./SendNotification.graphql'),
        variables: {
          req,
        },
      })

      await this.props.client.resetStore()
    }

    render() {
      return (
        <Main>
          <LoadData variables={{}}>
            {({ data }) => (
              <AdminCrudView
                items={data.sentNotifications.edges.map(e => e.node)}
                renderAddItem={({ onSave, onCancel }) => (
                  <EditNotificationForm
                    events={data.events.edges.map(edge => edge.node)}
                    onSave={onSave}
                    onCancel={onCancel}
                  />
                )}
                renderListItem={({ value }) => (
                  <NotificationAdminCard notification={value} />
                )}
                onAddItem={this.handleRequestAdd}
                addSuccessMessage="Notification sent"
              />
            )}
          </LoadData>
        </Main>
      )
    }
  },
)

const LoadData = createDataLoader<NotificationAdminPageQuery, {}>(
  require('./NotificationAdminPage.graphql'),
)
