import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(todoList: any, filterStatus: string): any {
        if (todoList.length === 0 || filterStatus === 'All') {
            return todoList;
        }
        const filteredTodoList = [];
        for (const todo of todoList) {
            if (todo.data().status === filterStatus) {
                filteredTodoList.push(todo);
            }
        }
        return filteredTodoList;
    }

}
