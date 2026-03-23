import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
        <NewspaperIcon fontSize="small" />
        Dev Newsletter
      </Link>

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
