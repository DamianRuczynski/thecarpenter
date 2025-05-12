import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../../projects/components/project-card/project-card.component';
import { Category, Room, TProject } from '../../models/project.model';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'tcp-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent, TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  projects: TProject[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // TODO in future when data will be more fullfiled display best projects from proejct service, can be max 3-4 projects
    this.projectService
      .getProject(Room.KITCHEN, 'g0z82B27V1X60d5puPqz')
      .subscribe((p) => {
        this.projects.push(p);
      });
  }
}
