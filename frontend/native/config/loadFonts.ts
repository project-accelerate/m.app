import { Font } from 'expo'

export function loadFonts() {
  return Font.loadAsync({
    'open-sans-bold': require('../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
    'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
    'patua-one': require('../assets/fonts/Patua_One/PatuaOne-Regular.ttf'),
    'oswald-bold': require('../assets/fonts/Oswald/Oswald-Bold.ttf'),
  })
}
