import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-y-2">

        {/* Logo + sign out on same row, sign out hidden on desktop */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:mr-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <NewspaperIcon fontSize="small" />
            Dev Newsletter
          </Link>

          {/* Sign out icon-only on mobile */}
          <form action={logout} className="sm:hidden">
            <button
              type="submit"
              className="flex items-center text-gray-500 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
              aria-label="Sign out"
            >
              <LogoutIcon fontSize="small" />
            </button>
          </form>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1 sm:flex-1">
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

        {/* Sign out with label on desktop only */}
        <form action={logout} className="hidden sm:block">
          <button
            type="submit"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogoutIcon fontSize="small" />
            Sign out
          </button>
        </form>

      </div>
    </header>
  );
}
