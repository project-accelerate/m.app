import { Font } from 'expo'
import { FontAwesome } from '@expo/vector-icons'

export function loadFonts() {
  return Font.loadAsync({
    ...(FontAwesome as any).font,
    'open-sans-bold': require('../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
    'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
    'open-sans-semibold': require('../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
    'patua-one': require('../assets/fonts/Patua_One/PatuaOne-Regular.ttf'),
    'oswald-bold': require('../assets/fonts/Oswald/Oswald-Bold.ttf'),
  })
}
