import React from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

const fineTuningExamples = {
  Mistral: {
    format: 'JSONL',
    example: `{ "input": "What is LLM?", "output": "A large language model." }`,
  },
  Falcon: {
    format: 'JSONL',
    example: `{ "input": "Explain supervised learning.", "output": "A training approach using labeled data." }`,
  },
  'LLaMA 2': {
    format: 'Alpaca',
    example: `{
  "instruction": "Translate to French",
  "input": "Good morning",
  "output": "Bonjour"
}`,
  },
  Gemma: {
    format: 'Alpaca',
    example: `{
  "instruction": "Summarize this paragraph",
  "input": "Large language models are...",
  "output": "They are powerful text generators."
}`,
  },
  Vicuna: {
    format: 'ShareGPT',
    example: `[
  { "from": "user", "value": "How do I make pasta?" },
  { "from": "assistant", "value": "Boil water, add pasta, cook 8–10 minutes." }
]`,
  },
  OpenChat: {
    format: 'ShareGPT',
    example: `[
  { "from": "user", "value": "Define AI." },
  { "from": "assistant", "value": "Artificial Intelligence simulates human thinking." }
]`,
  },
};

const compatibilityData = [
  { model: 'Mistral', format: 'JSONL', tokens: '32k', arch: 'Decoder-only' },
  { model: 'Falcon', format: 'JSONL', tokens: '8k', arch: 'Decoder-only' },
  { model: 'LLaMA 2', format: 'Alpaca', tokens: '4k', arch: 'Decoder-only' },
  { model: 'Gemma', format: 'Alpaca', tokens: '8k', arch: 'Decoder-only' },
  { model: 'Vicuna', format: 'ShareGPT', tokens: '8k', arch: 'Decoder-only' },
  { model: 'OpenChat', format: 'ShareGPT', tokens: '8k', arch: 'Decoder-only' },
];

const Section = ({ id, title, children }) => (
  <section id={id} className="space-y-4 scroll-mt-24">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
    {children}
  </section>
);

const CodeBlock = ({ code }) => (
  <div className="relative bg-gray-900 text-white text-sm rounded-md overflow-x-auto p-4">
    <button
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
      onClick={() => navigator.clipboard.writeText(code)}
      aria-label="Copy code"
    >
      <ClipboardIcon className="w-5 h-5" />
    </button>
    <pre className="whitespace-pre-wrap"><code>{code}</code></pre>
  </div>
);

export default function FineTuningGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:grid lg:grid-cols-4 gap-12 text-gray-800 dark:text-gray-100">
      {/* Sidebar TOC */}
      <aside className="hidden lg:block sticky top-24 self-start text-sm space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">On This Page</h3>
        <nav className="space-y-1 text-gray-600 dark:text-gray-400">
          {[
            'what-is',
            'types',
            'when',
            'models',
            'formats',
            'compatibility',
            'prepare',
            'pipeline',
            'tools',
            'compute',
            'evaluation',
            'deployment',
            'ethics',
            'how-it-helps',
          ].map(id => (
            <a key={id} href={`#${id}`} className="block hover:underline capitalize">
              {id.replace(/-/g, ' ')}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3 space-y-16">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Fine-Tuning Guide</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            A comprehensive reference for developers and AI enthusiasts looking to fine-tune open-source language models using Smart Data Processor.
          </p>
        </header>

        <Section id="what-is" title="What is Fine-Tuning?">
          <p>
            Fine-tuning adapts a pretrained language model to specialized data, letting it learn domain-specific vocabulary, tone, and behavior.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Pretraining:</strong> General training on massive corpora.</li>
            <li><strong>Fine-Tuning:</strong> Targeted training on your data.</li>
            <li><strong>Inference:</strong> Generating text post-training.</li>
          </ul>
        </Section>

        <Section id="types" title="Types of Fine-Tuning">
          <p>Methods vary by memory use, speed, and accuracy:</p>
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2">Method</th>
                <th className="p-2">Pros</th>
                <th className="p-2">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="p-2">Full Fine-Tuning</td>
                <td className="p-2">Highest accuracy</td>
                <td className="p-2">Heavy compute</td>
              </tr>
              <tr>
                <td className="p-2">LoRA / QLoRA</td>
                <td className="p-2">Memory-efficient</td>
                <td className="p-2">Minor accuracy drop</td>
              </tr>
              <tr>
                <td className="p-2">Prompt Tuning</td>
                <td className="p-2">Lightweight</td>
                <td className="p-2">Limited scope</td>
              </tr>
              <tr>
                <td className="p-2">Adapter / PEFT</td>
                <td className="p-2">Modular</td>
                <td className="p-2">Requires tooling</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section id="when" title="When to Fine-Tune vs Prompting vs RAG">
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Prompt Engineering</strong> for quick, lightweight tweaks.</li>
            <li><strong>RAG</strong> for dynamic retrieval-based tasks.</li>
            <li><strong>Fine-Tuning</strong> for stable, embedded model behavior.</li>
          </ul>
        </Section>

        <Section id="models" title="Supported Open-Source LLMs">
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Mistral 7B</strong> — Decoder-only, supports JSONL and LoRA.</li>
            <li><strong>Falcon</strong> — Decoder-only, supports JSONL and QLoRA.</li>
            <li><strong>LLaMA 2</strong> — Decoder-only, uses Alpaca format & PEFT.</li>
            <li><strong>Gemma</strong> — Decoder-only, uses Alpaca format.</li>
            <li><strong>Vicuna</strong> — Chat-tuned, uses ShareGPT format.</li>
            <li><strong>OpenChat</strong> — Chat-tuned, uses ShareGPT format.</li>
          </ul>
        </Section>

        <Section id="formats" title="Accepted Data Formats (By Model)">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(fineTuningExamples).map(([model, { format, example }]) => (
              <div key={model} className="bg-gray-900 text-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-1">{model} — <span className="text-green-300">{format}</span></h3>
                <pre className="overflow-x-auto text-sm bg-gray-800 p-3 rounded-md whitespace-pre-wrap">{example}</pre>
              </div>
            ))}
          </div>
        </Section>

        <Section id="compatibility" title="Format Compatibility Summary">
          <table className="w-full text-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden border dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Model</th>
                <th className="py-2 px-4 text-left">Format</th>
                <th className="py-2 px-4 text-left">Token Limit</th>
                <th className="py-2 px-4 text-left">Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {compatibilityData.map(({ model, format, tokens, arch }) => (
                <tr key={model}>
                  <td className="py-2 px-4">{model}</td>
                  <td className="py-2 px-4">{format}</td>
                  <td className="py-2 px-4">{tokens}</td>
                  <td className="py-2 px-4">{arch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="prepare" title="Tips for Preparing Data">
          <ul className="list-disc ml-6 space-y-1">
            <li>Match input-output fields to your model’s expectations.</li>
            <li>Keep each example within the model’s context window.</li>
            <li>Clean and dedupe your dataset.</li>
            <li>Balance across tasks if mixing multiple objectives.</li>
            <li>Test with small sample batches first.</li>
          </ul>
        </Section>

        <Section id="pipeline" title="Fine-Tuning Pipeline">
          <ol className="list-decimal ml-6 space-y-1">
            <li>Select and load your base model & tokenizer.</li>
            <li>Preprocess & format your dataset.</li>
            <li>Batch and pad data with a DataCollator.</li>
            <li>Train via Hugging Face Trainer or custom loop.</li>
            <li>Evaluate on validation set and adjust hyperparams.</li>
            <li>Save and push your fine-tuned model.</li>
          </ol>
        </Section>

        <Section id="tools" title="Libraries & Tools">
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Transformers</strong> — Hugging Face model & training API.</li>
            <li><strong>PEFT</strong> — LoRA, Adapters, Prefix Tuning.</li>
            <li><strong>Axolotl</strong> — YAML-driven fine-tuning pipeline.</li>
            <li><strong>TRL</strong> — Reinforcement Learning & reward modeling.</li>
          </ul>
        </Section>

        <Section id="compute" title="Hardware & Compute Requirements">
          <p>LoRA: 16–24GB VRAM; Full FT: 48–80GB or A100-class GPUs. Alternatives:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Colab Pro (good for LoRA demos)</li>
            <li>RunPod / Vast.ai (affordable cloud GPUs)</li>
            <li>AWS/GCP A100 instances (enterprise scale)</li>
          </ul>
        </Section>

        <Section id="evaluation" title="Evaluation & Testing">
          <ul className="list-disc ml-6 space-y-1">
            <li>Perplexity, BLEU/ROUGE for standard tasks.</li>
            <li>Human evaluation for subjective output.</li>
            <li>Automated tests for edge-case handling.</li>
          </ul>
        </Section>

        <Section id="deployment" title="Post-Fine-Tuning Deployment">
          <ul className="list-disc ml-6 space-y-1">
            <li>Hugging Face Inference Endpoints</li>
            <li>vLLM or TGI for low-latency serving</li>
            <li>Integration via OpenAI-compatible REST API</li>
          </ul>
        </Section>

        <Section id="ethics" title="Ethical Considerations">
          <ul className="list-disc ml-6 space-y-1">
            <li>Remove PII and sensitive data.</li>
            <li>Filter for toxic or biased content.</li>
            <li>Comply with model licenses and privacy policies.</li>
          </ul>
        </Section>

        <Section id="how-it-helps" title="How Smart Data Processor Helps">
          <p>
            Upload diaries, chat logs, or domain-specific text and instantly receive clean, ready-to-fine-tune JSONL, Alpaca, or ShareGPT datasets—no manual formatting required.
          </p>
        </Section>
      </main>
    </div>
  );
}
