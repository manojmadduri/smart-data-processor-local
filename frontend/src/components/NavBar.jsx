import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArchiveBoxIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

export default function NavBar() {
  const [theme, setTheme] = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navLinkClass = (path) =>
    `block px-4 py-2 rounded transition duration-200 ${
      location.pathname === path
        ? 'text-primary font-semibold underline underline-offset-4'
        : 'text-gray-800 dark:text-gray-300 hover:text-primary'
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 border-b ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      } bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
          onClick={() => setMenuOpen(false)}
        >
          <ArchiveBoxIcon className="w-6 h-6" />
          <span className="text-lg font-bold">Smart Data Processor</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/upload" className={navLinkClass('/upload')}>
            Upload
          </Link>
          <Link to="/guide" className={navLinkClass('/guide')}>
            FineTuning Guide
          </Link>
          <Link to="/pricing" className={navLinkClass('/pricing')}>
            Pricing
          </Link>
          <a
            href="https://github.com/manojmadduri/smart-data-processor-local"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-300 hover:text-primary"
          >
            GitHub
          </a>
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline px-3"
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="btn btn-sm btn-outline p-2"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <ul
            className={`absolute right-0 mt-2 w-56 rounded-box shadow-xl z-50 transform transition-all duration-200 origin-top bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
              menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            }`}
          >
            <li>
              <Link to="/upload" className={navLinkClass('/upload')} onClick={() => setMenuOpen(false)}>
                Upload
              </Link>
            </li>
            <li>
              <Link to="/guide" className={navLinkClass('/guide')} onClick={() => setMenuOpen(false)}>
                FineTuning Guide
              </Link>
            </li>
            <li>
              <Link to="/pricing" className={navLinkClass('/pricing')} onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/manojmadduri/smart-data-processor-local"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:text-primary"
              >
                GitHub
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="btn btn-sm w-full"
              >
                {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
