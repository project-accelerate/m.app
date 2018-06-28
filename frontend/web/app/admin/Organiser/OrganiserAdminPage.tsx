import React from 'react'
import { AdminCrudView } from 'frontend.web/app/admin/common/AdminCrudView/AdminCrudView'
import { createDataLoader } from 'frontend.web/app/common/LoadData/LoadData'
import {
  OrganiserAdminPageQuery,
  CreateOrganiserRequest,
} from 'frontend.web/queries'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { OrganiserAdminCard } from './OrganiserAdminCard'
import { EditOrganiserForm } from './EditOrganiserForm'
import { Main } from 'frontend.web/app/common/Layouts'

interface OrganiserAdminPageProps {
  client: ApolloClient<{}>
}

interface RequestAddProps extends CreateOrganiserRequest {
  // Workaround for Apollo incorectly treating Upload as string
  photoUpload?: any
}

export const OrganiserAdminPage = withApollo(
  class OrganiserAdminPage extends React.Component<OrganiserAdminPageProps> {
    handleRequestAdd = async (req: RequestAddProps) => {
      await this.props.client.mutate({
        mutation: require('./CreateOrganiser.graphql'),
        variables: {
          req,
        },
      })

      await this.props.client.resetStore()
    }

    handleRequestEdit = async (req: RequestAddProps) => {
      console.log('save', req)
    }

    render() {
      return (
        <Main>
          <LoadData variables={{}}>
            {({ data }) => (
              <AdminCrudView
                items={data.allOrganisers.edges.map(e => e.node)}
                renderAddItem={({ onSave, onCancel }) => (
                  <EditOrganiserForm
                    title="New Speaker"
                    onSave={onSave}
                    onCancel={onCancel}
                  />
                )}
                renderEditItem={({ value, onSave, onCancel }) => (
                  <EditOrganiserForm
                    title="Edit Speaker"
                    initial={{
                      name: value.name || '',
                      bio: value.bio || '',
                      profilePic: value.photo
                        ? value.photo.sourceUrl
                        : undefined,
                    }}
                    onCancel={onCancel}
                    onSave={onSave}
                  />
                )}
                renderListItem={({ value, onEdit }) => (
                  <OrganiserAdminCard onEdit={onEdit} organiser={value} />
                )}
                onAddItem={this.handleRequestAdd}
                onEditItem={this.handleRequestEdit}
                addSuccessMessage="Speaker added to conference"
              />
            )}
          </LoadData>
        </Main>
      )
    }
  },
)

const LoadData = createDataLoader<OrganiserAdminPageQuery, {}>(
  require('./OrganiserAdminPage.graphql'),
)
