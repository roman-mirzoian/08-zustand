import { noteHubApi } from './client';
import type { Note } from '@/types/note';

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