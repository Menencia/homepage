import { Component } from '@angular/core';
import { Project } from './project';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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

    this.projectsCollection = afs.collection<Project>('projects');
    this.projects = this.projectsCollection.valueChanges();
  }

  openLink = function (project) {
    // $window.open(project.link);
  };

  mouseEnter = function (e) {
    // var t = $(e.target).closest('.project');
    // $('.project').not(t).css('opacity', 0.5);
  };

  mouseLeave = function () {
    // $('.project').css('opacity', 1);
  };

}
