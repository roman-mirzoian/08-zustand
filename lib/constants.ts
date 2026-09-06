import type { NoteTag } from '@/types/note';

export const PER_PAGE = 12;

export const NOTE_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const OG_IMAGE_URL = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';
