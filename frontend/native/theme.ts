import { memoize } from 'lodash'
import { moderateScale } from 'react-native-size-matters'

export namespace theme {
  export namespace spacing {
    export const unit = moderateScale(6)
    export const border = moderateScale(2)

    export const level = memoize(
      (i: number): number => {
        if (i < 1) {
          return i
        }

        return unit + level(Math.floor(i) - 1)
      },
    )
  }

  export namespace zIndex {
    export const menu = 100
  }

  export namespace pallete {
    export const white = '#fff'
    export const transparent = 'rgba(255,255,255,0)'

    export const accent = 'rgb(226,6,19)'
    export const box = 'rgb(240,240,240)'
    export const separator = 'rgb(155,155,155)'
    export const contrast = 'rgba(60,60,60,0.9)'
    export const control = white
    export const borderLight = 'rgb(227,227,227)'
    export const borderDark = 'rgb(122,122,122)'
    export const red = 'rgba(236,0,0,1)'
    export const black = 'rgba(15,15,15,1)'
    export const imageOverlay = 'rgba(0,0,0,0.5)'

    export const header = accent
    export const cardBg = 'rgba(255,255,255,0.9)'
  }
}
