import { registerEnumType } from 'type-graphql'

export enum ConferenceId {
  TWT_2018 = 'TWT_2018',
  LABOUR_2018 = 'LABOUR_2018',
}

registerEnumType(ConferenceId, {
  name: 'ConferenceId',
})
