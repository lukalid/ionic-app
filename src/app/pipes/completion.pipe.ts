import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'completion'
})
export class CompletionPipe implements PipeTransform {

    transform(completion: {numberOfComplete: number, numberOfIncomplete: number}, ...args: any[]): any {
        const numberOfTodos = completion.numberOfComplete + completion.numberOfIncomplete;
        const percentage = (completion.numberOfComplete / numberOfTodos * 100).toFixed(2);
        return `Completed: ${completion.numberOfComplete} / ${numberOfTodos} - ${percentage}%`;
    }

}
