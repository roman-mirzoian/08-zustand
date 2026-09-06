import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import InterceptedModal from './InterceptedModal.client';
import NotePreview from './NotePreview.client';

export const dynamic = 'force-dynamic';

export default async function InterceptedNotePage({ params }: PageProps<'/notes/[id]'>) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const queryKey = ['note', id];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InterceptedModal>
        <NotePreview id={id} />
      </InterceptedModal>
    </HydrationBoundary>
  );
}
