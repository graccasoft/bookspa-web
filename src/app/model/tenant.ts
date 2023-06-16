export class Tenant {
  id: number
  companyName: string
  companyPhone: string
  companyEmail: string
  companyAddress: string
  contactName: string
  contactPhone: string
  reference: string
  openingTime: string
  closingTime: string


  constructor(id: number, companyName: string, companyPhone: string, companyEmail: string, companyAddress: string, contactName: string, contactPhone: string, reference: string, openingTime: string, closingTime: string) {
    this.id = id;
    this.companyName = companyName;
    this.companyPhone = companyPhone;
    this.companyEmail = companyEmail;
    this.companyAddress = companyAddress;
    this.contactName = contactName;
    this.contactPhone = contactPhone;
    this.reference = reference;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }
}
