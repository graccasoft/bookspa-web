import {Tenant} from "./tenant";

export class Client{
  id: number
  surname: string
  phoneNumber: string
  email: string
  address: string
  city: string
  country: string
  tenant: Tenant


  constructor(id: number, surname: string, phoneNumber: string, email: string, address: string, city: string, country: string, tenant: Tenant) {
    this.id = id;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
    this.tenant = tenant;
  }
}
