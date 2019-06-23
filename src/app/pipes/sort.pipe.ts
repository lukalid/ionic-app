import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(todoList: any, sortFunction: (todo1, todo2) => boolean): any {
        const sortedTodoList = todoList.slice();
        for (let i = 0; i < sortedTodoList.length - 1; i++) {
            for (let j = i + 1; j < sortedTodoList.length; j++) {
                if (sortFunction(sortedTodoList[i], sortedTodoList[j])) {
                    const pom = sortedTodoList[i];
                    sortedTodoList[i] = sortedTodoList[j];
                    sortedTodoList[j] = pom;
                }
            }
        }
        return sortedTodoList;
    }

}
