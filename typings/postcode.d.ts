declare module "postcode" {
  class Postcode {
    static validOutcode(outcode: string): boolean
    
    constructor(value: string)

    valid(): boolean
    normalise(): string
    outcode(): string
  }

  export = Postcode
}