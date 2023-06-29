export interface BookingReport{
    id:number
    createdAt:Date
    bookingDate:Date
    duration:number
    status:string
    client:string
    treatments:string
    reference:string
    employee:string
    paymentMethod:string
    totalAmount:number
}