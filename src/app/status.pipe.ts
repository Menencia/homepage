import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'ongoing':
        return 'En cours';
      case 'onpause':
        return 'en pause';
      case 'abandoned':
        return 'Abandonné';
    }
  }

}
