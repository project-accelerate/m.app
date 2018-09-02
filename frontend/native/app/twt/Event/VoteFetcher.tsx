import React from 'react'
import { OnMount } from '../../common/OnMount/OnMount'
import { WithActions } from '../../../state'

/** Sink component to fetch updated votes on load  */
export function VoteFetcher(props: {}) {
  return (
    <WithActions>
      {({ actions }) => (
        <OnMount>{() => actions.calendar.fetchVotes({})}</OnMount>
      )}
    </WithActions>
  )
}
