import { useEffect, useState } from 'react';
import { fetchHealth, type HealthResponse } from '@/services/health.service';

type Status = 'idle' | 'loading' | 'online' | 'offline';

/**
 * Day 1 placeholder page. It has no real dashboard functionality —
 * it only proves the frontend is running and can (optionally) reach
 * the backend health endpoint.
 */
export default function DashboardPlaceholder() {
  const [status, setStatus] = useState<Status>('idle');
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetchHealth()
      .then((data) => {
        if (!cancelled) {
          setHealth(data);
          setStatus('online');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('offline');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>IntellMeet</h1>
        <p style={styles.subtitle}>Day 1 foundation is up and running.</p>

        <div style={styles.statusRow}>
          <span
            style={{
              ...styles.dot,
              backgroundColor:
                status === 'online' ? '#22c55e' : status === 'offline' ? '#ef4444' : '#a3a3a3',
            }}
          />
          <span>
            Backend:{' '}
            {status === 'loading' && 'checking...'}
            {status === 'online' && `online (${health?.service})`}
            {status === 'offline' && 'unreachable — start the backend server'}
            {status === 'idle' && 'not checked yet'}
          </span>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#0f172a',
  },
  card: {
    padding: '2.5rem 3rem',
    borderRadius: '0.75rem',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  title: { fontSize: '2rem', margin: 0 },
  subtitle: { color: '#94a3b8', marginTop: '0.5rem' },
  statusRow: {
    marginTop: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  dot: { width: '0.6rem', height: '0.6rem', borderRadius: '9999px', display: 'inline-block' },
};
