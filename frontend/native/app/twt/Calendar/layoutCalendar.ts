import { sortBy, orderBy } from 'lodash'

// https://stackoverflow.com/questions/11311410/visualization-of-calendar-events-algorithm-to-layout-events-with-maximum-width

export interface LayoutItem<T = {}> {
  value: T
  startTime: Date
  endTime: Date
  left: number
  width: number
}

export function layoutCalendar(events: Array<LayoutItem>) {
  events = orderBy(events, [['startTime'], ['endTime']]) as LayoutItem[]
  let columns = new Array<Array<LayoutItem>>()
  let lastEventEnding: Date | undefined

  for (const ev of events) {
    if (lastEventEnding && ev.startTime >= lastEventEnding) {
      packEvents(columns)

      columns = []
      lastEventEnding = undefined
    }

    let placed = false
    for (const col of columns) {
      if (!collidesWith(col[col.length - 1], ev)) {
        col.push(ev)
        placed = true
        break
      }
    }

    if (!placed) {
      columns.push([ev])
    }

    if (!lastEventEnding || ev.endTime > lastEventEnding) {
      lastEventEnding = ev.endTime
    }
  }

  if (columns.length > 0) {
    packEvents(columns)
  }
}

/// Set the left and right positions for each event in the connected group.
/// Step 4 in the algorithm.
function packEvents(columns: LayoutItem[][]) {
  const numColumns = columns.length
  let iColumn = 0

  for (const col of columns) {
    for (const ev of col) {
      const colSpan = expandEvent(ev, iColumn, columns)
      ev.left = iColumn / numColumns
      ev.width = (iColumn + colSpan) / numColumns - ev.left
    }
    iColumn++
  }
}

/// Checks how many columns the event can expand into, without colliding with
/// other events.
/// Step 5 in the algorithm.
function expandEvent(ev: LayoutItem, iColumn: number, columns: LayoutItem[][]) {
  let colSpan = 1
  for (const col of columns.slice(iColumn + 1)) {
    for (const ev1 of col) {
      if (collidesWith(ev1, ev)) {
        return colSpan
      }
    }
    colSpan++
  }

  return colSpan
}

function collidesWith(x: LayoutItem, y: LayoutItem) {
  return x.startTime < y.endTime && x.endTime > y.startTime
}
