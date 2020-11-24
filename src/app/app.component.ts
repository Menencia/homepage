import { Component } from '@angular/core';
import { Project } from './project';
import { AngularFirestore } from '@angular/fire/firestore';
import { Status } from './status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projects: Project[];
  updated: Date | null;

  constructor(public afs: AngularFirestore) {
    this.projects = [];
    this.updated = null;

    this.loadProject();
    this.getUpdatedDate();
  }

  loadProject(): void {
    this.afs.collection<Project>('projects')
      .valueChanges().subscribe((projects: Project[]) => {
        this.projects = projects.sort(this.sortProject);
      });
  }

  getUpdatedDate(): void {
    this.afs.collection<any>('settings')
      .valueChanges().subscribe((settings: any[]) => {
        if (settings.length > 0) {
          this.updated = settings[0].updated.toDate();
        }
      });
  }

  sortProject(a: Project, b: Project): number {
    const order = [Status.Active, Status.Pause, Status.Abandoned];
    const findIndex = (status: string) => {
      return order.findIndex(e => e === status);
    };
    if (findIndex(a.status) > findIndex(b.status)) {
      return 1;
    }
    if (findIndex(a.status) < findIndex(b.status)) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  }

  openLink(project: Project): void {
    window.open(project.link);
  }
}
