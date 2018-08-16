import { layoutCalendar } from '../layoutCalendar'
import { startOfDay, addHours } from 'date-fns'

describe('Calendar.layoutCalendar', () => {
  it('should separate clashing events', () => {
    const e12_14 = twoHourEventWithTime(12)
    const e13_15 = twoHourEventWithTime(13)
    const e14_16 = twoHourEventWithTime(14)
    const e18_20 = twoHourEventWithTime(18)

    const layout = [e12_14, e13_15, e14_16, e18_20]

    layoutCalendar(layout)

    expect(layout).toEqual([
      { ...e12_14, left: 0, width: 0.5 },
      { ...e13_15, left: 0.5, width: 0.5 },
      { ...e14_16, left: 0, width: 0.5 },
      { ...e18_20, left: 0, width: 1 },
    ])
  })
})

function twoHourEventWithTime(t: number) {
  const baseTime = startOfDay('2010-01-01')
  const startTime = addHours(baseTime, t)
  const endTime = addHours(startTime, 2)

  return {
    value: t,
    startTime,
    endTime,
    left: 0,
    width: 0,
  }
}
