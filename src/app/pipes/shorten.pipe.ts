import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        const charNumber = args[0];
        return value.length > charNumber ? value.substr(0, charNumber) + '...' : value;
    }

}
