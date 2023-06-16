import {Tenant} from "./tenant";

export class User{
  id?: number
  firstName?: string
  username?: string
  lastName?: string
  password?:string
  role?: string
  tenant?: Tenant
  token?: string

}
