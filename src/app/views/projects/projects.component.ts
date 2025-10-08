import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/models/project';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public updated = new Date('2025/10/09');

  constructor(private http: HttpClient) {
    this.projects = [];
  }

  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.http
      .get<Project[]>('/assets/data/projects.json')
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  public openLink(project: Project): void {
    window.open(project.link);
  }
}
