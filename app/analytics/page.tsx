import { cookies } from 'next/headers';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TodayIcon from '@mui/icons-material/Today';
import HistoryIcon from '@mui/icons-material/History';

interface AnalyticsData {
  totalNewsLettersSent: number;
  totalNewsLettersSentThisMonth: number;
  totalNewsLettersSentLastMonth: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: 3, borderColor: accent, flex: 1 }}
    >
      <div className="p-6 flex flex-col items-center text-center">
        <span style={{ color: accent, display: 'flex' }} className="mb-2">{icon}</span>
        <Typography variant="h3" fontWeight={700} sx={{ color: accent, lineHeight: 1, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: '#9e9e9e' }}>
          {label}
        </Typography>
      </div>
    </Paper>
  );
}

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get('newsletter_api_key')?.value ?? '';

  const res = await fetch(`${process.env.RENDER_API_URL}/Analytics/monthly-newsletters`, {
    headers: {
      'X-ApiKey': apiKey,
      accept: 'text/plain',
    },
    cache: 'no-store',
  });

  const data: AnalyticsData | null = res.ok ? await res.json() : null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-500 mb-2">Analytics</h1>
      <p className="text-gray-500 mb-8 text-sm">Newsletter send totals at a glance.</p>

      {!data ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Could not load analytics.</p>
          <p className="text-sm mt-1">Check that your API key is valid or try again later.</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            label="All time newsletters sent"
            value={data.totalNewsLettersSent}
            icon={<MailOutlineIcon sx={{ fontSize: 48 }} />}
            accent="#1976d2"
          />
          <StatCard
            label="Sent this month"
            value={data.totalNewsLettersSentThisMonth}
            icon={<TodayIcon sx={{ fontSize: 48 }} />}
            accent="#2e7d32"
          />
          <StatCard
            label="Sent last month"
            value={data.totalNewsLettersSentLastMonth}
            icon={<HistoryIcon sx={{ fontSize: 48 }} />}
            accent="#ed6c02"
          />
        </div>
      )}
    </div>
  );
}
