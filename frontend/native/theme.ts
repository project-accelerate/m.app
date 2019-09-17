import { memoize } from 'lodash'
import { moderateScale } from 'react-native-size-matters'

export const spacing = new class {
  unit = moderateScale(6)
  border = moderateScale(2)

  level = memoize(
    (i: number): number => {
      if (i < 1) {
        return i
      }

      return this.unit + this.level(Math.floor(i) - 1)
    },
  )
}()

export const zIndex = new class {
  menu = 100
}()

export const pallete = new class {
  white = '#fff'
  transparent = 'rgba(255,255,255,0)'

  accent = 'rgb(226,6,19)'
  box = 'rgb(240,240,240)'
  separator = 'rgb(155,155,155)'
  contrast = 'rgba(60,60,60,0.9)'
  control = this.white
  borderLight = 'rgb(227,227,227)'
  borderDark = 'rgb(122,122,122)'
  red = 'rgba(236,0,0,1)'
  black = 'rgba(15,15,15,1)'
  imageOverlay = 'rgba(0,0,0,0.5)'

  header = this.accent
  cardBg = 'rgba(255,255,255,0.9)'
}()
