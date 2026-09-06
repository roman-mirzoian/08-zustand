import axios from 'axios';
import type { NewNote, Note } from '@/types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  const trimmedSearch = search.trim();

  if (trimmedSearch !== '') {
    params.search = trimmedSearch;
  }

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const response = await noteHubApi.get<FetchNotesResponse>('/notes', { params });

  return response.data;
};

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
