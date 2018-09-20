import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { VotesScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import { registration } from '../Registration/registrationState'
import VotesScreenQueryDocument from './VotesScreen.graphql'
import { EventListItemPressedEvent, EventListItem } from './EventListItem'
import { EventList } from './EventList'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { Columns } from '../../common/Widgets/Widgets'
import {
  Card,
  CardHeader,
  CardContent,
  CardContainer,
} from '../../common/Widgets/Card'
import { longDateOf } from '../../common/date-formats'
import { startOfDay } from 'date-fns'
import { ConnectionList } from '../../common/ConnectionList/ConnectionList'
import { theme } from '../../../theme'
import { EventDetailScreen } from './EventDetailScreen'
import { Typography, Br, Paragraphs } from '../../common/Typography/Typography'

const FetchEvents = createFetchData<VotesScreenQuery, {}>({
  query: VotesScreenQueryDocument,
})

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

export class VotesScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    headerTitle: 'Votes',
    drawerLabel: 'Votes',
    delegateOnly: true,
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    Routes.get().push(this.props.navigation, EventDetailScreen, {
      id: event.id,
      title: event.name,
    })
  }

  render() {
    return (
      <BasicScreen>
        <Connect>
          {({ userId }) => (
            <FetchEvents variables={{ userId }}>
              {({ data }) => (
                <ConnectionList
                  data={data.user.votes}
                  emptyMessage={
                    <CardContainer style={{ height: '100%' }}>
                      <Card style={{ marginTop: theme.spacing.level(4) }}>
                        <CardHeader>
                          We don’t have any information about votes yet
                        </CardHeader>
                        <CardContent>
                          <Typography>
                            We’ll add information about vote times here when it
                            becomes available.
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardContainer>
                  }
                  renderItem={event => (
                    <EventListItem
                      onPress={this.handleEventPressed}
                      event={event}
                    />
                  )}
                  sectionBy={event => startOfDay(event.startTime).toISOString()}
                  renderSection={longDateOf}
                />
              )}
            </FetchEvents>
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
