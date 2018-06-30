import React from 'react'
import { AdminCrudView } from 'frontend.web/app/admin/common/AdminCrudView/AdminCrudView'
import { createDataLoader } from 'frontend.web/app/common/LoadData/LoadData'
import {
  VenueAdminPageQuery,
  CreateVenueRequest,
  AddressEditorFragment,
  VenueAdminCardFragment,
} from 'frontend.web/queries'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { VenueAdminCard } from './VenueAdminCard'
import {
  EditVenueForm,
  EditVenueFormChange,
  EditVenueFormValue,
} from './EditVenueForm'
import { Main } from 'frontend.web/app/common/Layouts'

interface VenueAdminPageProps {
  client: ApolloClient<{}>
}

interface RequestAddProps extends CreateVenueRequest {
  // Workaround for Apollo incorectly treating Upload as string
  photoUpload?: any
}

export const VenueAdminPage = withApollo(
  class VenueAdminPage extends React.Component<VenueAdminPageProps> {
    handleRequestAdd = async (req: EditVenueFormChange) => {
      await this.addVenue({
        name: req.name,
        description: req.description,
        address: editableAddressFields(req),
        photoUpload: req.photoUpload,
      })
    }

    async addVenue(req: RequestAddProps) {
      await this.props.client.mutate({
        mutation: require('./CreateVenue.graphql'),
        variables: {
          req,
        },
      })

      await this.props.client.resetStore()
    }

    handleRequestEdit = async (req: EditVenueFormChange) => {
      console.log('save', req)
    }

    render() {
      return (
        <Main>
          <LoadData variables={{}}>
            {({ data }) => (
              <AdminCrudView<VenueAdminCardFragment, EditVenueFormChange>
                items={data.allVenues.edges.map(e => e.node)}
                renderAddItem={({ onSave, onCancel }) => (
                  <EditVenueForm
                    title="New Venue"
                    onSave={onSave}
                    onCancel={onCancel}
                  />
                )}
                renderEditItem={({
                  value: { id, address, photo, ...otherProps },
                  onSave,
                  onCancel,
                }) => (
                  <EditVenueForm
                    title="Edit Venue"
                    initial={{
                      photo: (photo && photo.sourceUrl) || undefined,
                      ...editableAddressFields(address),
                      ...otherProps,
                    }}
                    onCancel={onCancel}
                    onSave={onSave}
                  />
                )}
                renderListItem={({ value, onEdit }) => (
                  <VenueAdminCard onEdit={onEdit} venue={value} />
                )}
                onAddItem={this.handleRequestAdd}
                onEditItem={this.handleRequestEdit}
                addSuccessMessage="Venue added to conference"
              />
            )}
          </LoadData>
        </Main>
      )
    }
  },
)

const LoadData = createDataLoader<VenueAdminPageQuery, {}>(
  require('./VenueAdminPage.graphql'),
)

function editableAddressFields({
  city,
  postcode,
  streetAddress,
}: AddressEditorFragment): AddressEditorFragment {
  return {
    city,
    postcode,
    streetAddress,
  }
}
