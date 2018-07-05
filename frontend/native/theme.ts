import { memoize } from 'lodash'

export namespace theme {
  export namespace spacing {
    export const unit = 8

    export const level = memoize(
      (i: number): number => {
        if (i < 1) {
          return 0
        }

        return unit + level(Math.floor(i) - 1)
      },
    )
  }

  export namespace pallete {
    export const accent = '#ff2c63'
    export const white = '#fff'
  }

  export namespace typography {

  }
}
