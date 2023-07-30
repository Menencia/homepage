import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { Status } from '../status.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public updated = new Date('2023/07/30');

  constructor(private http: HttpClient) {
    this.projects = [];
  }

  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.http.get<Project[]>('/assets/data/projects.json').subscribe((projects) => {
      this.projects = projects.sort(this.sortProject);
    });
  }

  public sortProject(a: Project, b: Project): number {
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

  public openLink(project: Project): void {
    window.open(project.link);
  }

}
