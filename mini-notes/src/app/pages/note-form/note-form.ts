import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {

  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);

  successMessage = '';

  errorMessage = '';

  noteForm = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    text: ['', [
      Validators.required,
      Validators.minLength(5)
    ]]
  });

  get title() {
    return this.noteForm.get('title');
  }

  get text() {
    return this.noteForm.get('text');
  }

  onSubmit(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    this.noteService.addNote({
      title: this.title?.value ?? '',
      text: this.text?.value ?? ''
    }).subscribe({

      next: () => {

        this.successMessage = 'Заметка успешно создана';

        this.noteForm.reset();

      },

      error: () => {

        this.errorMessage = 'Не удалось создать заметку';

      }

    });

  }

}