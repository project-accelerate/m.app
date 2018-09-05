import { format } from 'date-fns'

export function timeOf(time: string) {
  return format(time, 'h:mma')
}

export function longDateOf(time: string) {
  return format(time, 'Do MMM')
}

export function weekdayOf(time: string) {
  return format(time, 'dddd')
}
