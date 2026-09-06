import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import { OG_IMAGE_URL, SITE_URL } from '@/lib/constants';
import css from './CreateNote.module.css';

const title = 'Create note | NoteHub';
const description = 'Create a new note in NoteHub.';
const url = `${SITE_URL}/notes/action/create`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [OG_IMAGE_URL],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
