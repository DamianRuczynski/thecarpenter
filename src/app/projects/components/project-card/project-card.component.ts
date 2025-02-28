import { Component, Input } from '@angular/core';
import { MediaCategory, TProject } from '../../../core/models/project.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tcp-project-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: TProject;

  get mainImage(): string | undefined {
    const image = this.project.media.find(
      (media) => media.category === MediaCategory.IMAGE
    );

    return image?.url;
  }
}
