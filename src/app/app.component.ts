import { Component } from '@angular/core';
import { Project, Status } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  projects: Project[] = [];

  constructor() {
    const p = new Project();
    p.code = 'ff7e';
    p.desc = 'Roman (non officiel) de FFVII.';
    p.link = 'http://ff7e.com';
    p.name = 'Final Fantasy VII: Expérience';
    p.active = false;
    this.projects.push(p);
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
