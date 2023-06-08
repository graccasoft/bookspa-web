import {Tenant} from "./tenant";

export class Treatment {
  id: number
  name: string
  description: string
  price: number
  minimumDuration: number
  maximumDuration: number
  tenant: Tenant

  constructor(id: number, name: string, description: string, price: number, minimumDuration: number, maximumDuration: number,tenant: Tenant) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.minimumDuration = minimumDuration;
    this.maximumDuration = maximumDuration;
    this.tenant = tenant;
  }
}
