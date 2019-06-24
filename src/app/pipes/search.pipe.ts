import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(todoList: any, searchTitle: string): any {
        searchTitle = searchTitle.trim();
        if (todoList.length === 0 || searchTitle === '' || searchTitle === 'all' || searchTitle === 'ALL' || searchTitle === 'All') {
            return todoList;
        }
        return todoList.filter((todo) => todo.data.title.indexOf(searchTitle) !== -1);
    }

}
