import { cache } from 'react';
import axios from 'axios';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { OG_IMAGE_URL, SITE_URL } from '@/lib/constants';
import NoteDetails from './NoteDetails.client';
import css from './NoteDetails.module.css';

export const dynamic = 'force-dynamic';

const getNote = cache(fetchNoteById);

export async function generateMetadata({ params }: PageProps<'/notes/[id]'>): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await getNote(id);
    const title = `${note.title} | NoteHub`;
    const description =
      note.content.trim() !== ''
        ? note.content.slice(0, 160)
        : `Note "${note.title}" tagged ${note.tag} in NoteHub.`;
    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [OG_IMAGE_URL],
      },
    };
  } catch {
    return {
      title: 'Note | NoteHub',
      description: 'Note details in NoteHub.',
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps<'/notes/[id]'>) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const queryKey = ['note', id];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getNote(id),
  });

  const noteState = queryClient.getQueryState(queryKey);
  if (noteState?.status === 'error') {
    if (axios.isAxiosError(noteState.error) && noteState.error.response?.status === 404) {
      notFound();
    }
    throw noteState.error;
  }

  return (
    <main className={css.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails />
      </HydrationBoundary>
    </main>
  );
}
