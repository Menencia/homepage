import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/models/project';
import { Status } from '../../shared/enums/status.enum';
import { HttpClient } from '@angular/common/http';
import { StatusPipe } from 'src/app/shared/pipes/status.pipe';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, StatusPipe, NgFor],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public updated = new Date('2024/04/24');

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
