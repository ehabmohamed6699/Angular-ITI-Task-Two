import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: unknown, format:string): unknown {
    let year: number = (Number(String(value)[0]) - 1) * 1000 + Number(String(value).slice(1, 3));
    let month: number = Number(String(value).slice(3, 5));
    let day: number = Number(String(value).slice(5, 7));
    switch (format) {
      case "FullDate":
        return `${day}/${month}/${year}`;
      case "YY":
        return `${year}`;
      case "MM":
        return `${month}`;
      case "DD":
        return `${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

}
