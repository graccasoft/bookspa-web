import {Tenant} from "./tenant";

export class Employee{
  id: number
  firstName: string
  surname: string
  phoneNumber: string
  isAvailable: boolean
  tenant: Tenant


  constructor(id: number, firstName: string, surname: string, phoneNumber: string, isAvailable: boolean, tenant: Tenant) {
    this.id = id;
    this.firstName = firstName;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.isAvailable = isAvailable;
    this.tenant = tenant;
  }
}
