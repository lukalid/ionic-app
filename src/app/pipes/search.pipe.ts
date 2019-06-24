import { Pipe, PipeTransform } from '@angular/core';
import {Util} from '../util/util';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(todoList: any, searchBarValue: string, searchSelectValue: string): any {
        if (todoList.length === 0 || searchBarValue === '' || searchBarValue === 'all' ||
            searchBarValue === 'ALL' || searchBarValue === 'All') {
            return todoList;
        }
        switch (searchSelectValue) {
            case 'Title':
                return this.searchByTitle(todoList, searchBarValue);
            case 'Year':
                return this.searchByYear(todoList, searchBarValue);
            case 'Difficulty':
                return this.searchByDifficulty(todoList, searchBarValue);
            default:
                return todoList;
        }
    }

    private searchByTitle(todoList: any, searchTitle: string) {
        searchTitle = searchTitle.trim().toLowerCase();
        return todoList.filter((todo) => todo.data.title.toLowerCase().indexOf(searchTitle) !== -1);
    }

    private searchByYear(todoList: any, searchYear: string) {
        return todoList.filter((todo) => {
            if (!Number(searchYear)) {
                return true;
            }
            return String(Util.getYearFromDate(todo.data.date)).startsWith(searchYear);
        });
    }

    private searchByDifficulty(todoList: any, difficulty: string) {
        return todoList.filter((todo) => {
            if (!Number(difficulty)) {
                return true;
            }
            return todo.data.difficulty === Number(difficulty);
        });
    }

}
