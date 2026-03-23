'use client';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';

interface Props {
  id: number;
  title: string;
  formattedDate: string | null;
  overview: string;
  subject: string;
}

export default function NewsletterCard({ id, title, formattedDate, overview, subject }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardActionArea component={Link} href={`/newsletter/${id}`}>
        <CardContent sx={{ px: 3, py: 2.5 }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Chip
                  icon={<LabelIcon />}
                  label={subject}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: 11, height: 22 }}
                />
                {formattedDate && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                    <CalendarTodayIcon style={{ fontSize: 11 }} />
                    {formattedDate}
                  </span>
                )}
              </div>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {title}
              </Typography>
              {overview && (
                <Typography variant="body2" color="text.secondary" mt={0.5} sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {overview}
                </Typography>
              )}
            </div>
            <ArrowForwardIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
