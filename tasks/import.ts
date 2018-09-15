import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { Container } from 'typedi'
import { EventAdminService } from 'backend/app/events/application/EventAdminService'
import { VenueAdminService } from 'backend/app/events/application/VenueAdminService'
import { PersonAdminService } from 'backend/app/events/application/PersonAdminService'
import { EventFamily } from 'common/domain/EventFamily'
import { VenueRepository } from 'backend/app/events/external/VenueRepository'
import { last, compact } from 'lodash'
import { readFileSync, writeFileSync } from 'fs'

export async function pullDataFromTwt(...opts: string[]) {
  dotenv.config({ path: 'config/import.env' })

  const {
    getImageStream,
    venueRepository,
    personAdmin,
    eventAdmin,
    venueAdmin,
  } = getInterfaces()

  const speakers = await loadYaml(
    'https://github.com/dellsystem/the-world-transformed/raw/master/_data/programme/speakers.yml',
  )

  for (const key of Object.keys(speakers)) {
    const speaker = speakers[key]

    const uploaded =
      (await personAdmin.addPerson({
        importRef: getImportRef(key),
        bio: speaker.bio,
        name: speaker.name,
        photoUpload: speaker.photo
          ? {
              stream: await getImageStream(
                `https://raw.githubusercontent.com/dellsystem/the-world-transformed/master/images/speakers/${key}.jpg`,
              ),
              filename: `${key}.jpg`,
              mimetype: 'image/jpeg',
              encoding: '',
            }
          : undefined,
        twitterHandle: extractTwitterHandle(speaker.twitter),
      })) || {}

    speaker.id = uploaded.id
  }

  const events = await loadYaml(
    'https://raw.githubusercontent.com/dellsystem/the-world-transformed/master/_data/programme/sessions.yml',
  )

  for (const key of Object.keys(events)) {
    const event = events[key]

    eventAdmin.submitEvent({
      importRef: getImportRef(key),
      introduction: event.description.trim() || '',
      detail: '',
      startTime: parseTimestamp(event.start_timestamp),
      endTime: parseTimestamp(event.end_timestamp),
      speakers: compact(event.speakers.split(' ')).map((s: any) => {
        if (!speakers[s.trim()]) {
          throw Error(`Not found: ${s}`)
        }

        return speakers[s.trim()].id
      }),
      name: event.title,
      venue: (await acquireVenue(event.venue, event.room)).id,
      family: EventFamily.TWT_2018,
      photoUpload: event.image
        ? {
            stream: await getImageStream(
              `https://raw.githubusercontent.com/dellsystem/the-world-transformed/master/images/sessions/${
                event.image
              }.jpg`,
            ),
            filename: `${key}.jpg`,
            mimetype: 'image/jpeg',
            encoding: '',
          }
        : undefined,
    })
  }

  async function acquireVenue(key: string, room: string) {
    const importRef = getImportRef([key.trim(), room.trim()].join('.'))
    const venue = await venueRepository.findOne({
      importRef,
    })

    if (venue) {
      return venue
    }

    return venueAdmin.addVenue({
      name: [key.trim(), room.trim()].join(' '),
      address: {
        city: 'Liverpool',
        postcode: 'L1 5EW',
        streetAddress: 'NOT A REAL ADDRESS',
      },
      importRef,
    })
  }

  function getImportRef(key: string) {
    return `twt:${key.trim()}`
  }

  async function fetchRemote(src: string) {
    if (opts.includes('--cached')) {
      try {
        return readFileSync(encodeURIComponent(src), 'utf8')
      } catch {
        const data = await fetch(src).then(x => x.text())
        writeFileSync(encodeURIComponent(src), data)

        return data
      }
    } else {
      return await fetch(src).then(x => x.text())
    }
  }

  function loadYaml(src: string) {
    const yaml = require('yaml').default

    return fetchRemote(src).then(res =>
      // Arrrrrrgh YAML directives.........
      yaml.parse(res.replace(/\!\!python\/str/g, '')),
    )
  }

  function extractTwitterHandle(url?: string) {
    return (url && last(url.split('/'))) || undefined
  }

  function parseTimestamp(ts: string) {
    const isoString = [
      [ts.substring(0, 4), ts.substring(4, 6), ts.substring(6, 8)].join('-'),
      'T',
      [ts.substring(9, 11), ts.substring(11, 13), '00'].join(':'),
    ].join('')
    return new Date(isoString)
  }

  function extractDetail(description: string) {
    const [intro, ...detailSentences] =
      (typeof description === 'string' ? description : '').split('.') ||
      ([] as string[])
    const detail = detailSentences.join('.')

    if (intro.length * 2 > detail.length) {
      return { intro }
    }

    return { intro, detail }
  }

  function getInterfaces() {
    if (opts.includes('--dry-run')) {
      const eventAdmin = {
        async submitEvent(props: any) {
          console.log('event', props)
          return { id: props.importRef }
        },
      } as EventAdminService
      const venueAdmin = {
        async addVenue(props: any) {
          console.log('venue', props)
          return ((venueRepository as any).venues[props.importRef] = {
            ...props,
            id: props.importRef,
          })
        },
      } as VenueAdminService
      const personAdmin = {
        async addPerson(props: any) {
          console.log('person', props)
          return { id: props.importRef }
        },
      } as PersonAdminService
      const venueRepository = ({
        venues: {} as any,
        async findOne({ importRef }: any) {
          return this.venues[importRef]
        },
      } as any) as VenueRepository

      const getImageStream = (url: string) => url as any

      return {
        getImageStream,
        venueRepository,
        personAdmin,
        eventAdmin,
        venueAdmin,
      }
    } else {
      const getImageStream = (url: string) => fetch(url).then(res => res.body)

      const eventAdmin = Container.get<EventAdminService>(EventAdminService)
      const personAdmin = Container.get<PersonAdminService>(PersonAdminService)
      const venueAdmin = Container.get<VenueAdminService>(VenueAdminService)
      const venueRepository = Container.get<VenueRepository>(VenueRepository)

      return {
        getImageStream,
        venueRepository,
        personAdmin,
        eventAdmin,
        venueAdmin,
      }
    }
  }
}
