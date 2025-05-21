// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const [theme, setTheme] = useTheme();
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className="navbar fixed top-0 w-full shadow-sm z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Icon + Title */}
        <Link to="/" className="flex items-center space-x-2">
          <ArchiveBoxIcon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
          <span className="text-lg font-bold">Smart Data Processor</span>
        </Link>

        {/* Links & Controls */}
        <div className="flex items-center space-x-4">
          <Link
            to="/upload"
            className="text-gray-800 dark:text-gray-200 hover:underline"
          >
            Upload
          </Link>

          <button
            onClick={toggle}
            className="btn btn-primary p-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <a
            href="https://github.com/manojmadduri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
