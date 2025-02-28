import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/pages/project-details/project-details.component';
import { WelcomeComponent } from './core/components/welcome/welcome.component';

export const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: ':room/:category', component: ProjectListComponent },
  { path: ':room/:category/:id', component: ProjectDetailsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
