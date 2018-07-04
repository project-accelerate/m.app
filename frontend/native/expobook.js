import createExpo from 'expobook'

const storyFiles = [
  { name: 'twt > Home', source: require('./app/twt/Home/Home.stories') },
  {
    name: 'common > Layouts',
    source: require('./app/common/Layouts/Layouts.stories'),
  },
]

const expobook = createExpo()
storyFiles.forEach(addStoriesFrom)
export default expobook.build()

function addStoriesFrom({ source, name }) {
  if (!source.stories) {
    return
  }

  Object.keys(source.stories).forEach(key => {
    expobook.add(`${name} > ${key}`, source.stories[key])
  })
}
