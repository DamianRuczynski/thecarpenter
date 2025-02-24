import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tcp-project-details',
  standalone: true,
  imports: [],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  room!: string;
  category!: string;
  projectId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.room = params['room'];
      this.category = params['category'];
      this.projectId = params['id'];
      console.log(
        `Ładowanie projektu: ${this.projectId} w kategorii ${this.category} (${this.room})`
      );
    });
  }
}
