import { Pipe, PipeTransform } from '@angular/core';
import { Status } from './status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case Status.Active:
        return 'Actif';
      case Status.Pause:
        return 'en pause';
      case Status.Abandoned:
        return 'Abandonné';
    }
  }

}
