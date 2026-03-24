import { cookies } from 'next/headers';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';
import NewsletterCard from '@/components/NewsletterCard';

interface Newsletter {
  id: number;
  title: string;
  sendDate: string;
  overview: string;
  subject: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  // Guard against the default/null date from the API (0001-01-01)
  if (d.getFullYear() < 1900) return null;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get('newsletter_api_key')?.value ?? '';

  const res = await fetch(`${process.env.RENDER_API_URL}/NewsLetter`, {
    headers: {
      'X-ApiKey': apiKey,
      accept: 'text/plain',
    },
    cache: 'no-store',
    redirect: 'follow',
  });

  const newsletters: Newsletter[] = res.ok ? await res.json() : [];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-500 mb-2">Newsletter Archive</h1>
      <p className="text-gray-500 mb-8 text-sm">Daily coding newsletters, generated daily.</p>

      {newsletters.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <InboxIcon style={{ fontSize: 48 }} className="mb-3 text-gray-300" />
          <Typography variant="h6" color="text.secondary">No newsletters found.</Typography>
          <Typography variant="body2" color="text.disabled" mt={0.5}>
            Check that your API key is valid or try again later.
          </Typography>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {newsletters.map((nl) => (
            <li key={nl.id}>
              <NewsletterCard
                id={nl.id}
                title={nl.title}
                subject={nl.subject}
                overview={nl.overview}
                formattedDate={formatDate(nl.sendDate)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
