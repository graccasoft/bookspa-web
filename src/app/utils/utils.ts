export class Utils {

  static dateToUrlFormat(date: Date) {
    const yyyy = date.getFullYear();
    let mm: number = date.getMonth() + 1; // Months start at 0!
    let dd: number = date.getDate();

    const day = (dd < 10) ? '0' + dd : dd;
    const month = (mm < 10) ? '0' + mm : mm;

    return yyyy + '-' + month + '-' + day;
  }

  static dateToTimeSlot(date: Date){
    date = new Date(date)
    let hr: number = date.getHours()
    let min: number = date.getMinutes()

    const hour = (hr < 10) ? '0' + hr : hr;
    const minutes = (min < 10) ? '0' + min : min;

    return hour + ':' + minutes;
  }

  static toHoursAndMinutes(totalMinutes: number): { hours: number, minutes: number } {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  static formatDuration(totalMinutes:number): string{
    const { hours, minutes } = Utils.toHoursAndMinutes(totalMinutes);
    if( hours == 0) return `${minutes} mins`
    if( minutes == 0) return `${hours} hr`
    return `${hours} hr, ${minutes} mins`
  }
}
