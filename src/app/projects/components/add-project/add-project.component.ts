import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Room,
  Category,
  RoomCategories,
} from '../../../core/models/project.model';
import { ProjectService } from '../../../core/service/project.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'tcp-add-project',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    MatProgressSpinner,
  ],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  rooms = Object.values(Room);
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      room: ['', [Validators.required]],
      category: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.previewUrls = this.selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      if (this.selectedFiles.length === 0) {
        this.snackBar.open(
          'Przynajmniej jedno zdjęcie jest wymagane!',
          'Zamknij',
          {
            duration: 3000,
          }
        );
      }
    }
  }

  get availableCategories(): Category[] {
    const room: Room = this.projectForm.get('room')?.value as Room;
    return room ? RoomCategories[room] || [] : [];
  }

  get isCategoryDisabled(): boolean {
    return !this.projectForm.get('room')?.value;
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.selectedFiles.length > 0) {
      this.isLoading = true;
      const { title, room, category, description } = this.projectForm.value;
      this.projectService
        .addProject(
          title,
          room,
          category || null,
          description || '',
          this.selectedFiles
        )
        .then(() => {
          this.snackBar.open('Projekt dodany pomyślnie!', 'Zamknij', {
            duration: 3000,
          });
          this.selectedFiles = [];
          this.previewUrls = [];
          this.isLoading = false;
          this.projectForm.reset();
          this.projectForm.markAsUntouched();
          this.projectForm.markAsPristine();
        })
        .catch((error) => {
          this.snackBar.open('Błąd podczas dodawania projektu!', 'Zamknij', {
            duration: 3000,
          });
          console.error(error);
        });
    } else {
      this.snackBar.open(
        'Wypełnij wszystkie wymagane pola i dodaj zdjęcie!',
        'Zamknij',
        {
          duration: 3000,
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }
}
