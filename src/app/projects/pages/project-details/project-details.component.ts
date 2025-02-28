import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  Category,
  MediaCategory,
  Room,
  TProject,
} from '../../../core/models/project.model';
import { ProjectService } from '../../../core/service/project.service';
import { switchMap, tap } from 'rxjs';
import { SafeResourceUrlPipe } from '../../../shared/pipes/safe-resouorce-url.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tcp-project-details',
  standalone: true,
  imports: [TranslateModule, SafeResourceUrlPipe, MatIconModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  project!: TProject;
  room!: Room;
  category!: Category;
  projectId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((params) => {
          this.room = params['room'];
          this.category = params['category'];
          this.projectId = params['id'];
        }),
        switchMap((params) =>
          this.projectService.getProject(params['room'], params['id'])
        )
      )
      .subscribe((project) => {
        project.media.sort((a, b) =>
          a.category === MediaCategory.IMAGE ? -1 : 1
        );
        this.project = project;
        this.category = project.category;
      });
  }

  navigate(room: Room, category?: Category): void {
    this.router.navigate([room, category ?? '']);
  }
}
