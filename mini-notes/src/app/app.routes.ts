import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteFormComponent } from './pages/note-form/note-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Главная'
  },
  {
    path: 'notes',
    component: NotesListComponent,
    title: 'Заметки'
  },
  {
    path: 'create',
    component: NoteFormComponent,
    title: 'Создать заметку'
  },
  {
    path: '**',
    redirectTo: ''
  }
];