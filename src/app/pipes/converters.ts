import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convertTemp'})
export class ConvertTempPipe implements PipeTransform {
  transform(value: number, units: string): string {
      if (units === 'C' || units === 'Celsius'){
          return (value - 273.15).toFixed(2) + "°C";
      } else if (units === 'F' || units === 'Fahrenheit'){
        return ((value - 273.15) * 9/5 + 32).toFixed(2) + "°F";
      }
    console.log(`Could not convert to "${units}" units`);
    return value.toFixed(2) + "°K";
  }
}