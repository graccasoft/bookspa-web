import { Component } from '@angular/core';
import * as moment from 'moment';
import { BookingReport } from 'src/app/model/booking-report';
import { Tenant } from 'src/app/model/tenant';
import { User } from 'src/app/model/user';
import { AccountsService } from 'src/app/service/accounts.service';
import { BookingService } from 'src/app/service/booking.service';
import { DownloadFileService } from 'src/app/service/download-file.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  bookings: BookingReport[] = []
  currentPeriod = "DAILY"
  startDate!: Date
  endDate!: Date
  tenant!: Tenant | undefined

  constructor(
    private bookingService: BookingService,
    private accountsService: AccountsService,
    private downloadService: DownloadFileService
  ) { }

  ngOnInit() {
    const user = this.accountsService.userValue as User
    if (user) {
      this.tenant = user.tenant
      this.loadReport()
    }
  }
  setCurrentPeriod(period: string) {
    this.currentPeriod = period
    switch (period) {
      case "DAILY":
        this.startDate = moment().startOf('day').toDate();
        this.endDate = moment().endOf('day').toDate();
        break;
      case "WEEKLY":
        this.startDate = moment().startOf('week').toDate();
        this.endDate = moment().endOf('week').toDate();
        break;
      case "MONTHLY":
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().endOf('month').toDate();
        break;
    }
    this.loadReport()
  }

  getReportTotal(paymentMethod: string): number {
    return this.bookings.filter(booking => booking.paymentMethod === paymentMethod)
      .reduce((sum, current) => sum + current.totalAmount, 0);
  }

  loadReport() {
    const startDate = moment(this.startDate).format()
    const endDate = moment(this.endDate).add(1, 'days').format()

    // @ts-ignore
    this.bookingService.getTenantBookingReport(this.tenant.id, startDate, endDate)
      .subscribe(bookings => this.bookings = bookings)
  }

  downloadCsv() {
    const startDate = moment(this.startDate).format()
    const endDate = moment(this.endDate).add(1, 'days').format()
    const downloadUrl = `${this.bookingService.apiUrl}/report-csv?tenantId=${this.tenant?.id}&startDate=${startDate}&endDate=${endDate}`
    this.downloadService
      .download(downloadUrl)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'bookings.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
  downloadPdf() {
    const startDate = moment(this.startDate).format()
    const endDate = moment(this.endDate).add(1, 'days').format()
    const downloadUrl = `${this.bookingService.apiUrl}/report-pdf?tenantId=${this.tenant?.id}&startDate=${startDate}&endDate=${endDate}`
    this.downloadService
      .download(downloadUrl)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'bookings.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
}
