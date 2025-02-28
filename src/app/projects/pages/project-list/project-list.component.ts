import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category, Room, TProject } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/service/project.service';
import { switchMap, tap } from 'rxjs';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginatorComponent } from '../../../ui/paginator/paginator.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tcp-project-list',
  standalone: true,
  imports: [
    RouterLink,
    ProjectCardComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PaginatorComponent,
    TranslateModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private lastVisibleDocuments = signal<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);
  public projects$ = signal<TProject[]>([]);
  public loading$ = signal<boolean>(false);
  public total$ = signal<number>(0);
  public page$ = signal<number>(5);
  public current$ = signal<number>(0);
  public room = signal<Room>(Room.KITCHEN);
  public category = signal<Category | undefined>(undefined);

  ngOnInit() {
    this.loading$.set(true);

    this.route.params
      .pipe(
        tap((params) => {
          this.room.set(params['room']);
          this.category.set(params['category']);
          this.current$.set(0);
          this.lastVisibleDocuments.set([null]);
        }),
        switchMap((params) =>
          this.projectService.getTotalProjectCount(
            params['room'],
            params['category']
          )
        ),
        tap((count) => {
          this.total$.set(count);
        }),
        switchMap(() =>
          this.projectService.getProjectsPage(
            this.room(),
            this.page$(),
            null,
            this.category()
          )
        )
      )
      .subscribe({
        next: (result) => {
          this.projects$.set(result.projects);

          if (result.lastVisible) {
            const docs = [...this.lastVisibleDocuments()];
            docs[0] = null;
            docs[1] = result.lastVisible;
            this.lastVisibleDocuments.set(docs);
          }

          this.loading$.set(false);
        },
        error: (err) => {
          console.error('Błąd podczas pobierania projektów:', err);
          this.loading$.set(false);
        },
      });
  }

  public onPageChange(newPageIndex: number): void {
    this.loading$.set(true);

    if (newPageIndex > this.current$()) {
      const lastDoc = this.lastVisibleDocuments()[newPageIndex];
      const docToUse =
        lastDoc ||
        this.lastVisibleDocuments()[this.lastVisibleDocuments().length - 1];

      this.projectService
        .getProjectsPage(this.room(), this.page$(), docToUse, this.category())
        .subscribe({
          next: (result) => {
            this.projects$.set(result.projects);
            this.current$.set(newPageIndex);

            if (result.lastVisible) {
              const docs = [...this.lastVisibleDocuments()];
              docs[newPageIndex + 1] = result.lastVisible;
              this.lastVisibleDocuments.set(docs);
            }

            this.loading$.set(false);
          },
          error: (err) => {
            console.error('Błąd podczas pobierania następnej strony:', err);
            this.loading$.set(false);
          },
        });
    } else {
      this.projectService
        .getProjectsPage(
          this.room(),
          this.page$(),
          this.lastVisibleDocuments()[newPageIndex],
          this.category()
        )
        .subscribe({
          next: (result) => {
            this.projects$.set(result.projects);
            this.current$.set(newPageIndex);
            this.loading$.set(false);
          },
          error: (err) => {
            console.error('Błąd podczas pobierania poprzedniej strony:', err);
            this.loading$.set(false);
          },
        });
    }
  }
}
