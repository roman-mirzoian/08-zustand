'use client';

import { useState } from 'react';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { PER_PAGE } from '@/lib/constants';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

interface NotesProps {
  tag: string;
}

export default function Notes({ tag }: NotesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', tag, currentPage, searchTerm],
    queryFn: () => fetchNotes({ page: currentPage, perPage: PER_PAGE, tag, search: searchTerm }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <h2>{tag === 'all' ? 'All notes' : tag}</h2>
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes. Please try again.</p>}
      {isSuccess && notes.length === 0 && <p>No notes found for this tag.</p>}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
