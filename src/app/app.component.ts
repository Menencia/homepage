import { Component } from '@angular/core';
import { Project } from './project';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;

  constructor(afs: AngularFirestore) {

    const options: QueryFn = ref => ref.orderBy('active', 'desc').orderBy('abandoned', 'asc');
    this.projectsCollection = afs.collection<Project>('projects', options);
    this.projects = this.projectsCollection.valueChanges();
  }

  getStatus(project) {
    if (project.active) {
      return 'ongoing';
    } else if (!project.abandoned) {
      return 'onpause';
    } else {
      return 'abandoned';
    }
  }

  openLink = function (project) {
    window.open(project.link);
  };

}
