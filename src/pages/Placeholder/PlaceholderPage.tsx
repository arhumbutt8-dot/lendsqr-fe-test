import { useLocation } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import styles from './PlaceholderPage.module.scss';

function toTitle(path: string): string {
  return path
    .replace('/', '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const title = toTitle(pathname);

  return (
    <AppLayout>
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.card}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="26" stroke="#E5E9F2" strokeWidth="2"/>
          <path d="M28 18V30" stroke="#545F7D" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="28" cy="37" r="2" fill="#545F7D"/>
        </svg>
        <h2>Coming Soon</h2>
        <p>The <strong>{title}</strong> section is under development.</p>
      </div>
    </AppLayout>
  );
}
