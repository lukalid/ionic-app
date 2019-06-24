import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, charNumber: number): any {
        return value.length > charNumber ? value.substr(0, charNumber) + '...' : value;
    }

}
