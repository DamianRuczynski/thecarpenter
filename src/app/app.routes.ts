import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/pages/project-details/project-details.component';
import { ProjectCardComponent } from './projects/components/project-card/project-card.component';

export const routes: Routes = [
  { path: 'home', component: ProjectCardComponent },
  { path: ':room/:category', component: ProjectListComponent },
  { path: ':room/:category/:id', component: ProjectDetailsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
