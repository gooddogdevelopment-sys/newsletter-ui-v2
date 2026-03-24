import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <NewspaperIcon fontSize="small" />
          Dev Newsletter
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-lg"
          >
            <NewspaperIcon style={{ fontSize: 16 }} />
            Archive
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-lg"
          >
            <BarChartIcon style={{ fontSize: 16 }} />
            Analytics
          </Link>
        </nav>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogoutIcon fontSize="small" />
          Sign out
        </button>
      </form>
    </header>
  );
}
