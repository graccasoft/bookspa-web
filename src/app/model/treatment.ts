import {Tenant} from "./tenant";
import {TreatmentCategory} from "./treatment-category";

export class Treatment {
  id: number
  name: string
  description: string
  price: number
  minimumDuration: number
  maximumDuration: number
  tenant: Tenant
  category?:TreatmentCategory
  isPromotion:boolean = false

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
