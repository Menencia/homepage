import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { Project } from '../../shared/models/project';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects = signal<Project[]>([]);

  readonly updated = new Date('2025/10/09');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>('data/projects.json').subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  openLink(project: Project) {
    window.open(project.link);
  }
}
