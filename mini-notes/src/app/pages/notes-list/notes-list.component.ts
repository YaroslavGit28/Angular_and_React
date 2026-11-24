import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteService, Note } from '../../services/note.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  private noteService = inject(NoteService);

  notes: Note[] = [];

  isLoading = true;

  errorMessage = '';

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {

    this.isLoading = true;

    this.noteService.getNotes().subscribe({

      next: (data) => {
        this.notes = data;
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage = 'Не удалось загрузить заметки';
        this.isLoading = false;
      }

    });

  }

  remove(id: number): void {

    this.noteService.deleteNote(id).subscribe({

      next: () => {
        this.notes = this.notes.filter(note => note.id !== id);
      },

      error: () => {
        alert('Ошибка удаления');
      }

    });

  }

}