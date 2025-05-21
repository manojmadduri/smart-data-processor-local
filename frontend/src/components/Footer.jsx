import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12">
      <div className="bg-white rounded-t-3xl shadow-xl py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <span className="text-gray-600 text-sm">
            © {year} Manoj Madduri
          </span>
          <a
            href="https://github.com/manojmadduri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.427 2.865 8.183 6.839 9.504.5.092.682-.217.682-.482
                   0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607
                   1.003.07 1.531 1.032 1.531 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.113-4.555-4.951
                   0-1.093.39-1.987 1.03-2.686-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
                   c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.547 1.376.203 2.393.1 2.646.64.699 1.028
                   1.593 1.028 2.686 0 3.848-2.339 4.695-4.566 4.943.359.31.679.921.679 1.857 0 1.341-.012 2.422-.012
                   2.749 0 .268.18.58.688.482A10.025 10.025 0 0022 12.017C22 6.484 17.523 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
