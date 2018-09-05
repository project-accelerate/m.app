import React from 'react'
import { unwrapConnection } from 'frontend.common/util'
import { AdminCrudView } from 'frontend.web/app/admin/common/AdminCrudView/AdminCrudView'
import { createDataLoader } from 'frontend.web/app/common/LoadData/LoadData'
import {
  EventAdminPageQuery,
  CreateEventRequest,
  EventAdminCardFragment,
  EditEventRequest,
} from 'frontend.web/queries'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { EventAdminCard } from './EventAdminCard'
import { EditEventForm, EditEventFormChange } from './EditEventForm'
import { Main } from 'frontend.web/app/common/Layouts'

interface EventAdminPageProps {
  client: ApolloClient<{}>
}

interface RequestAddProps extends CreateEventRequest {
  // Workaround for Apollo incorectly treating Upload as string
  photoUpload?: any
}

interface RequestEditProps extends EditEventRequest {
  // Workaround for Apollo incorectly treating Upload as string
  photoUpload?: any
}


export const EventAdminPage = withApollo(
  class EventAdminPage extends React.Component<EventAdminPageProps> {

    handleRequestAdd = async (req: EditEventFormChange) => {
      await this.addEvent({
        name: req.name,
        speakers: req.speakers,
        venue: req.venue,
        family: req.family,
        startTime: req.startTime,
        endTime: req.endTime,
        introduction: req.introduction,
        detail: req.detail,
        photoUpload: req.photoUpload,
      })
    }

    async addEvent(req: RequestAddProps) {
      await this.props.client.mutate({
        mutation: require('./CreateEvent.graphql'),
        variables: {
          req,
        },
      })

      await this.props.client.resetStore()
    }

    handleRequestEdit = async (req: EditEventFormChange) => {
      await this.editEvent({
        id: req.id,
        name: req.name,
        speakers: req.speakers,
        venue: req.venue,
        family: req.family,
        startTime: req.startTime,
        endTime: req.endTime,
        introduction: req.introduction,
        detail: req.detail,
        photoUpload: req.photoUpload,
      })
    }

    editEvent = async (req: RequestEditProps) => {
      console.log('save', req)
      await this.props.client.mutate({
        mutation: require('./EditEvent.graphql'),
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
              <AdminCrudView<EventAdminCardFragment, EditEventFormChange>
                items={data.allEvents.edges.map(e => e.node)}
                renderAddItem={({ onSave, onCancel }) => (
                  <EditEventForm
                    title="New Event"
                    onSave={onSave}
                    onCancel={onCancel}
                    venueOptions={unwrapConnection(data.venueOptions)}
                    speakerOptions={unwrapConnection(data.speakerOptions)}
                  />
                )}
                renderEditItem={({
                  value: { id, speakers, venue, photo, ...otherProps },
                  onSave,
                  onCancel,
                }) => (
                  <EditEventForm
                    title="Edit Event"
                    initial={{
                      id: id,
                      photo: (photo && photo.sourceUrl) || undefined,
                      speakers: unwrapConnection(speakers, 'id'),
                      venue: venue.id,
                      ...otherProps,
                    }}
                    onCancel={onCancel}
                    onSave={onSave}
                    venueOptions={unwrapConnection(data.venueOptions)}
                    speakerOptions={unwrapConnection(data.speakerOptions)}
                  />
                )}
                renderListItem={({ value, onEdit }) => (
                  <EventAdminCard onEdit={onEdit} event={value} />
                )}
                onAddItem={this.handleRequestAdd}
                onEditItem={this.handleRequestEdit}
                addSuccessMessage="Event added to conference"
              />
            )}
          </LoadData>
        </Main>
      )
    }
  },
)

const LoadData = createDataLoader<EventAdminPageQuery, {}>(
  require('./EventAdminPage.graphql'),
)
