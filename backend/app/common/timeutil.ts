export const militaryTime = (hh: number, mm: number) => {
  const hours = hh + Math.floor(mm / 60)
  const minutes = mm % 60

  return [
    hours >= 10 ? String(hours) : `0${hours}`,
    minutes >= 10 ? String(minutes) : `0${minutes}`,
  ].join(':')
}

export const decodeMilitaryTime = (t: string): [number, number] =>
  t.split(':').map(Number) as any

export const required = <T>(x: T | undefined, desc: string): T => {
  if (typeof x === 'undefined') {
    throw Error('missing ' + desc)
  }

  return x
}
