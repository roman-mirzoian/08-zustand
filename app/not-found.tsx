import type { Metadata } from 'next';
import css from './not-found.module.css';
import { OG_IMAGE_URL, SITE_URL } from '@/lib/constants';

const title = '404 - Page not found | NoteHub';
const description = 'Sorry, the page you are looking for does not exist.';
const url = `${SITE_URL}/not-found`;

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

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
