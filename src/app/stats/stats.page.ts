import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../util/util.service';
import { Router } from '@angular/router';
import { StatsService } from './stats.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  stats: any[];

  constructor(private utilService: UtilService, private router: Router) { }

  async ngOnInit() {
    const loading = await this.utilService.createLoading();
    loading.present();
    this.stats = [];
    StatsService.queryForStatsList()
        .onSnapshot((querySnapshot) => {
          for (const doc of querySnapshot.docs) {
            this.stats.push(this.getStat(doc));
          }
          this.sortByYear();
          loading.dismiss();
        }, (error) => {
            loading.dismiss();
            this.utilService.showToast(error.message, 'danger');
        });
  }

  private getStat(doc: firebase.firestore.QueryDocumentSnapshot) {
    const numberOfTodos = doc.data().numberOfComplete + doc.data().numberOfIncomplete;
    return {
      data: {
        year: doc.data().year,
        averageDifficulty: (doc.data().difficultySum / numberOfTodos).toFixed(2),
          completion: {
              numberOfComplete: doc.data().numberOfComplete,
              numberOfIncomplete: doc.data().numberOfIncomplete
          }
      }
    };
  }

  private sortByYear() {
    for (let i = 0; i < this.stats.length - 1; i++) {
      for (let j = i + 1; j < this.stats.length; j++) {
        if (this.stats[i].data.year > this.stats[j].data.year) {
          const pomData = this.stats[i].data;
          this.stats[i].data = this.stats[j].data;
          this.stats[j].data = pomData;
        }
      }
    }
  }

  async onSignOut() {
    const loading = await this.utilService.createLoading();
    loading.present();
    AuthService.signOut()
        .then(
            () => {
              loading.dismiss();
              this.utilService.showToast('Sign out successful!', 'success');
              this.onBack();
            },
            (error) => {
              loading.dismiss();
              this.utilService.showToast(error, 'danger');
            }
        )
        .catch((error) => {
          loading.dismiss();
          this.utilService.showToast(error, 'danger');
        });
  }

  onBack() {
    this.router.navigate(['/todo-list']);
  }

  isUserSignedIn() {
    return AuthService.isUserSignedIn();
  }

}
