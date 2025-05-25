import React, { useState } from 'react';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            fetch('https://formspree.io/f/xanogypn', {
              method: 'POST',
              body: new FormData(form),
              headers: { Accept: 'application/json' },
            }).then(() => setSubmitted(true));
          }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 animate-fade-in"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Give Feedback</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              We’d love your thoughts, suggestions, or improvements.
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-1/2 bg-base-200"
            />
            {/* <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-1/2 bg-base-200"
            /> */}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            className="input input-bordered w-full bg-base-200"
          />

          <textarea
            name="message"
            required
            placeholder="Your feedback or suggestion..."
            rows="4"
            className="textarea textarea-bordered w-full bg-base-200"
          />

          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary" required />
              <span className="label-text ml-2 text-sm text-gray-600 dark:text-gray-300">
                I agree to share this feedback anonymously
              </span>
            </label>
          </div> */}

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
          >
            📬 Submit Feedback
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            We’ll never share your details. Anonymous by default.
          </p>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full space-y-4 animate-fade-in">
          <div className="text-5xl">🎉</div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Thank you!</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your feedback was submitted successfully.
          </p>
        </div>
      )}
    </div>
  );
}
