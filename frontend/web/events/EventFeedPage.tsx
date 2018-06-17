import * as React from 'react'
import { createDataLoader } from '../common/LoadData/LoadData'
import { DynamicContent } from '../common/DynamicContent/DynamicContent'
import { EventFeedPageQuery, EventFeedPageQueryVariables } from '../queries'
import {
  EventFeedContainer,
  EventFeedSearchbar,
  EventFeedInitialContent,
  EventFeed,
} from './EventFeed'

export default function EventFeedPage() {
  return (
    <EventFeedContainer>
      <DynamicContent>
        <EventFeedPageContent />
      </DynamicContent>
    </EventFeedContainer>
  )
}

interface EventFeedPageState {
  searchRadiusInMiles: number
  postcode?: string
}

const FetchData = createDataLoader<
  EventFeedPageQuery,
  EventFeedPageQueryVariables
>(require('./EventFeedPage.graphql'))

class EventFeedPageContent extends React.Component<{}, EventFeedPageState> {
  state: EventFeedPageState = {
    searchRadiusInMiles:
      Number(localStorage.getItem('searchRadiusInMiles')) || 5,
    postcode: localStorage.getItem('postcode') || undefined,
  }

  handlePostcodeChange = (postcode: string) => {
    localStorage.setItem('postcode', postcode)
    this.setState({ postcode })
  }

  handleRadiusChange = (searchRadiusInMiles: number) => {
    localStorage.setItem('searchRadiusInMiles', String(searchRadiusInMiles))
    this.setState({ searchRadiusInMiles })
  }

  render() {
    const { postcode, searchRadiusInMiles } = this.state

    return (
      <>
        {postcode && (
          <EventFeedSearchbar
            radiusInMiles={searchRadiusInMiles}
            postcode={postcode}
            onPostcodeChange={this.handlePostcodeChange}
            onRadiusChange={this.handleRadiusChange}
          />
        )}
        {this.renderMain()}
      </>
    )
  }

  renderMain() {
    const { postcode, searchRadiusInMiles } = this.state

    if (!postcode) {
      return <EventFeedInitialContent onSearch={this.handlePostcodeChange} />
    }

    return (
      <FetchData
        message="Searching…"
        variables={{ postcode, radiusInMiles: searchRadiusInMiles }}
      >
        {({ data }) => <EventFeed events={data.eventFeed} />}
      </FetchData>
    )
  }
}
