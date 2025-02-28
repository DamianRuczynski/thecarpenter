import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../../projects/components/project-card/project-card.component';
import { TProject } from '../../models/project.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tcp-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent, TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  projects: TProject[] = [];
  // TODO use menuservice.menuconfig to get collection names to get some projects (max 4 projects to display)
}
