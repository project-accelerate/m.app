import { format } from 'date-fns'

export function timeOf(time: string | Date) {
  return format(time, 'h:mma')
}

export function longDateOf(time: string | Date) {
  return format(time, 'Do MMM')
}

export function weekdayOf(time: string | Date) {
  return format(time, 'dddd')
}
