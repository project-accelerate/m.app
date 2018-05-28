export enum DistanceUnit {
  m = 1,
  km = 1000,
  miles = 1609.34
}

export class Distance {
  constructor(
    public readonly value: number,
    public readonly unit: DistanceUnit
  ) { }

  get inMeters() {
    return this.convertTo(DistanceUnit.m).value
  }

  convertTo(unit: DistanceUnit) {
    return new Distance(this.value * this.unit / unit, unit)
  }
}
