import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../enums/status.enum';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case Status.Active:
        return 'Actif';
      case Status.Pause:
        return 'en pause';
      case Status.Abandoned:
        return 'Abandonné';
    }
    return '';
  }

}
