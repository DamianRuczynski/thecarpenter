import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TProject } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/service/project.service';
import { switchMap } from 'rxjs';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'tcp-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  projects: TProject[] = [];
  room!: string;
  category!: string;

  constructor(
    private route: ActivatedRoute,
    public projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) =>
          this.projectService.getProjects(params['room'], params['category'])
        )
      )
      .subscribe((projects) => {
        this.projects = projects;
      });
  }
}
