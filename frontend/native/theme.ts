import { memoize } from 'lodash'

export namespace theme {
  export namespace spacing {
    export const unit = 8
    export const border = 2

    export const level = memoize(
      (i: number): number => {
        if (i < 1) {
          return i
        }

        return unit + level(Math.floor(i) - 1)
      },
    )
  }

  export namespace pallete {
    export const white = '#fff'
    export const transparent = 'rgba(255,255,255,0)'

    export const accent = '#ff2c63'
    export const contrast = 'rgba(60,60,60,0.9)'
    export const red = 'rgba(255,20,20,1)'
    export const black = 'rgba(0,0,0,1)'
    export const imageOverlay = 'rgba(0,0,0,0.5)'

    export const header = accent
    export const cardBg = 'rgba(255,255,255,0.9)'
  }
}
