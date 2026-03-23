'use client';
import { login } from '@/app/actions/auth';
import { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function LoginForm() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-1">
          <NewspaperIcon className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Dev Newsletter</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">Enter your API key to access the archive.</p>

        <form action={login} className="flex flex-col gap-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="relative flex items-center">
              <KeyIcon className="absolute left-3 text-gray-400" style={{ fontSize: 18 }} />
              <input
                id="apiKey"
                name="apiKey"
                type={showKey ? 'text' : 'password'}
                required
                placeholder="Enter your API key"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 flex items-center"
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey
                  ? <VisibilityOffIcon style={{ fontSize: 18 }} />
                  : <VisibilityIcon style={{ fontSize: 18 }} />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Access Newsletter
          </button>
        </form>
      </div>
    </div>
  );
}
