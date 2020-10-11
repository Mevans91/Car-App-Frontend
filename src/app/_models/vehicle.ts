export class Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  serviceScheduled: string;
  condition: string;
  constructor ({
    id = null,
    make = '',
    model = '',
    year = null,
    mileage = null,
    serviceScheduled = '',
    condition = '',
    ...rest
  }) {
      Object.assign(this, rest)
      this.id = id
      this.make = make
      this.model = model
      this.year = year
      this.mileage = mileage
      this.serviceScheduled = serviceScheduled
      this.condition = condition

  }
}
