import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { createFetchData } from '../../common/FetchData/FetchData'
import NewsDetailScreenQueryDocument from './NewsDetailScreen.graphql'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import {
  Card,
  CardHeader,
  CardContent,
  CardContainer,
} from '../../common/Widgets/Card'
import {
  NewsDetailScreenQuery,
  NewsDetailScreenQueryVariables,
} from '../../../queries'
import { NewsDetail } from './NewsDetail'

const FetchNews = createFetchData<
  NewsDetailScreenQuery,
  NewsDetailScreenQueryVariables
>({
  query: NewsDetailScreenQueryDocument,
})

export class NewsDetailScreen extends React.Component<
  NavigationScreenProps<{ id: string }>
> {
  static navigationOptions = {
    headerTitle: 'News',
  }

  render() {
    return (
      <BasicScreen>
        <FetchNews variables={{ id: this.props.navigation.getParam('id') }}>
          {({ data }) => <NewsDetail item={data.newsItem} />}
        </FetchNews>
      </BasicScreen>
    )
  }
}
