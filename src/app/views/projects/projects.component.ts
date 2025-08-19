import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StatusPipe } from 'src/app/shared/pipes/status.pipe';
import { Status } from '../../shared/enums/status.enum';
import { Project } from '../../shared/models/project';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, StatusPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public updated = new Date('2025/08/19');

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
