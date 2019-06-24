import * as firebase from 'firebase';
import { AuthService } from '../auth/auth.service';
import {Util} from '../util/util';

export class StatsService {

    constructor() { }

    static queryForStatsList() {
        const userUid = AuthService.getCurrentUserUid();
        return firebase.firestore().collection('stats')
            .where('userUid', '==', userUid);
    }

    static updateStats(date: string, difficulty: number, numberOfComplete, numberOfIncomplete) {
        const userUid = AuthService.getCurrentUserUid();
        const year = Util.getYearFromDate(date);

        firebase.firestore().collection('stats')
            .where('userUid', '==', userUid)
            .where('year', '==', year)
            .get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                firebase.firestore().collection('stats')
                    .add({year, userUid, difficultySum: difficulty, numberOfComplete: 0, numberOfIncomplete: 1})
                    .then(() => console.log('added'));
            } else {
                const doc = querySnapshot.docs[0];
                firebase.firestore().collection('stats').doc(doc.id).update({
                    userUid,
                    year,
                    numberOfComplete: doc.data().numberOfComplete + numberOfComplete,
                    numberOfIncomplete: doc.data().numberOfIncomplete + numberOfIncomplete,
                    difficultySum: doc.data().difficultySum + difficulty
                });
            }
        });
    }

}
