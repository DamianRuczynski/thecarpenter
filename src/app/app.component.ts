import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './core/service/project.service';
import { AsyncPipe } from '@angular/common';
import { Category, Room, TProject } from './core/models/project.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  projects: TProject[] = [];
  constructor(public projectService: ProjectService) {}
  async ngOnInit() {
    this.projects = await this.projectService.getProjects(
      Room.BATHROOM,
      Category.SHOWER
    );
  }
}
