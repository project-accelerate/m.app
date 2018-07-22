import createExpo from 'expobook'
import { sortBy } from 'lodash'

const storyFiles = [
  { name: 'twt > Home', source: require('./app/twt/Home/Home.stories') },
  {
    name: 'twt > Event',
    source: require('./app/twt/Event/Event.stories'),
  },
  {
    name: 'twt > Registration',
    source: require('./app/twt/Registration/Registration.stories'),
  },
  {
    name: 'common > Layouts',
    source: require('./app/common/Layouts/Layouts.stories'),
  },
  {
    name: 'common > Carousel',
    source: require('./app/common/Carousel/Carousel.stories'),
  },
]

const expobook = createExpo()

sortBy(storyFiles, 'name').forEach(addStoriesFrom)

export default expobook.build()

function addStoriesFrom({ source, name }) {
  if (!source.stories) {
    return
  }

  Object.keys(source.stories).forEach(key => {
    expobook.add(`${name} > ${key}`, source.stories[key])
  })
}
