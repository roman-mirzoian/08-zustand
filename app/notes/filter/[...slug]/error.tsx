'use client';

interface FilteredNotesErrorProps {
  error: Error & { digest?: string };
}

export default function FilteredNotesError({ error }: FilteredNotesErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
