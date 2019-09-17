import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import * as registration from '../Registration/registrationState'
import NewsScreenQueryDocument from './NewsScreen.graphql'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import {
  Card,
  CardHeader,
  CardContent,
  CardContainer,
} from '../../common/Widgets/Card'
import { longDateOf } from '../../common/date-formats'
import { startOfDay } from 'date-fns'
import { ConnectionList } from '../../common/ConnectionList/ConnectionList'
import { NewsPanel } from './NewsPanel'
import { NewsScreenQuery, NewsScreenQueryVariables } from '../../../queries'
import { Routes } from '../../../routes'
import { NewsDetailScreen } from './NewsDetailScreen'

const FetchNews = createFetchData<NewsScreenQuery, NewsScreenQueryVariables>({
  query: NewsScreenQueryDocument,
})

const Connect = createStateConnector(() => ({
  user: registration.selectors.userId,
}))

export class NewsScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    headerTitle: 'News',
    drawerLabel: 'News',
  }

  handleItemPress = (id: string) => {
    Routes.get().push(this.props.navigation, NewsDetailScreen, { id })
  }

  render() {
    return (
      <BasicScreen>
        <Connect>
          {({ user }) => (
            <FetchNews variables={{ user }}>
              {({ data }) => (
                <ConnectionList
                  data={data.news}
                  renderItem={news => (
                    <NewsPanel news={news} onPress={this.handleItemPress} />
                  )}
                  order="desc"
                  sectionBy={news => startOfDay(news.timeSent).toISOString()}
                  sortKey="timeSent"
                  renderSection={longDateOf}
                />
              )}
            </FetchNews>
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
