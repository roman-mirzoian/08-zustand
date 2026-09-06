import type { Metadata } from 'next';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { OG_IMAGE_URL, PER_PAGE, SITE_URL } from '@/lib/constants';
import Notes from './Notes.client';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps<'/notes/filter/[...slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';
  const title = tag === 'all' ? 'All notes | NoteHub' : `${tag} notes | NoteHub`;
  const description =
    tag === 'all'
      ? 'Browse all your notes in NoteHub.'
      : `Browse notes tagged "${tag}" in NoteHub.`;
  const url = `${SITE_URL}/notes/filter/${tag}`;

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
}

export default async function FilteredNotesPage({ params }: PageProps<'/notes/filter/[...slug]'>) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();
  const queryKey = ['notes', tag, 1];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, tag }),
  });

  const notesState = queryClient.getQueryState(queryKey);
  if (notesState?.status === 'error') {
    throw notesState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
