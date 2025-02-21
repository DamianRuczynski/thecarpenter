import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './core/service/project.service';
import { AsyncPipe } from '@angular/common';
import { Category, Room, TProject } from './core/models/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  projects: TProject[] = [];

  constructor(
    public projectService: ProjectService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('pl');
  }
  async ngOnInit() {
    this.projects = await this.projectService.getProjects(
      Room.BATHROOM,
      Category.SHOWER
    );
  }
}
