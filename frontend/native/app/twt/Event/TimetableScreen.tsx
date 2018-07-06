import React from 'react'
import { Query } from 'react-apollo'
import {
  SafeAreaView,
  StatusBar,
  ListView,
  ListViewDataSource,
  FlatList,
  SectionList,
  ActivityIndicator,
} from 'react-native'
import { NavigationScreenOptions } from 'react-navigation'
import { Background } from '../../common/Layouts/Layouts'
import { theme } from '../../../theme'
import { TimetableScreenQuery } from '../../../queries'

import TimeTableScreenQuery from './TimetableScreen.graphql'
import { EventListItem } from './EventListItem'
import { ConnectionList } from '../../common/ConnectionList/ConnectionList'
import { EventList } from './EventList'

const datasource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
})

export class TimetableScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Timetable',
    headerTintColor: theme.pallete.white,
    headerStyle: {
      backgroundColor: theme.pallete.header,
    },
  }

  render() {
    return (
      <Background>
        <Query<TimetableScreenQuery> query={TimeTableScreenQuery}>
          {({ data }) => <EventList data={data && data.events} />}
        </Query>
      </Background>
    )
  }
}
