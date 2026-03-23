import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import CodeIcon from '@mui/icons-material/Code';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

interface NewsletterDetail {
  id: number;
  title: string;
  sendDate: string;
  subject: string;
  overview: string;
  codeSnippet: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (d.getFullYear() < 1900) return null;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsletterPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const apiKey = cookieStore.get('newsletter_api_key')?.value ?? '';

  const res = await fetch(`${process.env.RENDER_API_URL}/NewsLetter/${id}`, {
    headers: {
      'X-ApiKey': apiKey,
      accept: 'text/plain',
    },
    cache: 'no-store',
  });

  if (!res.ok) notFound();

  const newsletter: NewsletterDetail = await res.json();
  const date = formatDate(newsletter.sendDate);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-8"
      >
        <ArrowBackIcon style={{ fontSize: 16 }} />
        Back to archive
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <LabelIcon style={{ fontSize: 12 }} />
            {newsletter.subject}
          </span>
          {date && (
            <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
              <CalendarTodayIcon style={{ fontSize: 11 }} />
              {date}
            </span>
          )}
        </div>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {newsletter.title}
        </Typography>
      </div>

      <Divider sx={{ mb: 4 }} />

      {/* Overview */}
      <Typography variant="body1" sx={{ color: '#9e9e9e' }} lineHeight={1.8} mb={4}>
        {newsletter.overview}
      </Typography>

      {/* Code snippet */}
      {newsletter.codeSnippet && (
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border-b border-gray-700">
            <CodeIcon sx={{ fontSize: 16, color: 'grey.400' }} />
            <Typography variant="caption" sx={{ color: 'grey.400', fontFamily: 'monospace' }}>
              C#
            </Typography>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1.25rem',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
            <code>{newsletter.codeSnippet}</code>
          </pre>
        </Paper>
      )}
    </div>
  );
}
