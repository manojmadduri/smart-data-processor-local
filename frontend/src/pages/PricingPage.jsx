import React, { useState } from 'react';

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      yearly: '$0',
      subtext: 'For personal experimentation',
      features: [
        '1 upload per session',
        '10KB file size limit',
        'Smart & Fine-tune JSONL',
        'No login required',
      ],
      link: '/',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$5/mo',
      yearly: '$48/yr',
      subtext: 'Unlimited power for individuals',
      features: [
        'Unlimited uploads',
        '1MB per file',
        'History & priority queue',
        'Early access to features',
      ],
      link: '#',
      yearlyLink: '#',
      highlight: true,
    },
    {
      name: 'API Access',
      price: '$29/mo',
      yearly: '$290/yr',
      subtext: 'For teams and automation builders',
      features: [
        'All Pro features',
        'Full REST API access',
        '3,000 file credits/mo',
        'Priority support',
      ],
      link: '#',
      yearlyLink: '#',
      highlight: false,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="text-lg mt-4 text-gray-500 dark:text-gray-400">
          Pay only for what you need. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className={billing === 'monthly' ? 'font-semibold' : 'opacity-50'}>Monthly</span>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={billing === 'yearly'}
              onChange={() => setBilling(b => (b === 'monthly' ? 'yearly' : 'monthly'))}
            />
            <div className="swap-on text-primary">🔁</div>
            <div className="swap-off text-primary">🔁</div>
          </label>
          <span className={billing === 'yearly' ? 'font-semibold' : 'opacity-50'}>Yearly</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => {
          const price = billing === 'yearly' ? plan.yearly : plan.price;
          const link = billing === 'yearly' && plan.yearlyLink ? plan.yearlyLink : plan.link;

          return (
            <div
              key={i}
              className={`border rounded-xl shadow-xl p-6 transition-transform hover:-translate-y-1 ${
                plan.highlight ? 'border-primary bg-base-200' : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm opacity-60 mb-4">{plan.subtext}</p>

              <div className="text-4xl font-bold mb-6">{price}</div>

              <ul className="space-y-2 mb-6 text-sm">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    ✅ {f}
                  </li>
                ))}
              </ul>

              <a
                href={link}
                className={`w-full btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.name === 'Free' ? 'Start for Free' : 'Choose Plan'}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
