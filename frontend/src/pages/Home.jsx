import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  // Example JSONL snippets as formatted strings
  const exampleSmart = `{
  "input": "What event or celebration did I participate in?",
  "completion": "Monday, December 25, 2023\\nI visited my family and we had a big dinner together.",
  "date": "2023-12-25",
  "topic": "Family"
}`;

  const exampleFine = `{
  "prompt": "What event or celebration did I participate in?",
  "completion": "Monday, December 25, 2023\\nI visited my family and we had a big dinner together."
}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="navbar fixed top-0 w-full py-4 px-6 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">Smart Data Processor</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => nav('/upload')}
              className="btn btn-primary"
            >
              Upload
            </button>
            <a
              href="https://github.com/manojmadduri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-center">
            About Smart Data Processor
          </h1>

          {/* Smart JSONL Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Smart JSONL <code>memories.jsonl</code></h2>
            <p className="text-gray-700 dark:text-gray-300">
              This file contains one JSON object per line with:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li><code>input</code>: A generated question like “What event or celebration did I participate in?”</li>
              <li><code>completion</code>: The original diary sentence as the answer.</li>
              <li><code>date</code>: A normalized date in <code>YYYY-MM-DD</code> format.</li>
              <li><code>topic</code>: A high-level category (Work, Family, Travel, etc.).</li>
            </ul>
            <div className="gradient-box mt-4">
              <pre className="whitespace-pre-wrap">{exampleSmart}</pre>
            </div>
            <p className="text-sm text-gray-200 mt-2">
              Use this for embedding into a vector database and RAG-style retrieval.
            </p>
          </section>

          {/* Fine-tune JSONL Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Fine-tune JSONL <code>finetune_data.jsonl</code></h2>
            <p className="text-gray-700 dark:text-gray-300">
              This file contains prompt→completion pairs, one JSON object per line:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li><code>prompt</code>: The same question as above.</li>
              <li><code>completion</code>: The original diary sentence (answer).</li>
            </ul>
            <div className="gradient-box mt-4">
              <pre className="whitespace-pre-wrap">{exampleFine}</pre>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              Upload this to fine-tune your favorite LLM on your own personal data.
            </p>
          </section>

          {/* Call to action */}
          <div className="text-center">
            <button
              onClick={() => nav('/upload')}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
