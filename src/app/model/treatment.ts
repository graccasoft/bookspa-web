export class Treatment {
  id: number
  name: string
  description: string
  price: number
  minimumDuration: number
  maximumDuration: number

  constructor(id: number, name: string, description: string, price: number, minimumDuration: number, maximumDuration: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.minimumDuration = minimumDuration;
    this.maximumDuration = maximumDuration;
  }
}
