import { noteHubApi } from './client';
import type { NewNote, Note } from '@/types/note';

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await noteHubApi.get<Note>(`/notes/${noteId}`);

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await noteHubApi.post<Note>('/notes', newNote);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await noteHubApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
};