# Smart Data Processor

A powerful tool that transforms plain-text files into structured datasets optimized for AI applications.

## Overview

Smart Data Processor converts collections of `.txt` files (diaries, logs, notes) into two structured JSONL datasets:

### Smart JSONL (`memories.jsonl`)
- Optimized for **vector embedding** and **RAG retrieval**
- Each JSON object contains:
  - `input`: An intelligently generated question
  - `output`: The original sentence from your text
  - `date`: Normalized as `YYYY-MM-DD`
  - `topic`: High-level category (Work, Family, Travel, etc.)

### Fine-tune JSONL (`finetune_data.jsonl`)
- Ready for **model fine-tuning** with any LLM provider
- Each JSON object contains:
  - `prompt`: The generated question
  - `completion`: The original sentence

## Features

- ✅ **Instant conversion** of plain text to structured JSONL
- ✅ **Intelligent question generation** using sentence embeddings
- ✅ **Zero-shot topic classification**
- ✅ **Automatic date extraction & normalization**
- ✅ **Dual-purpose outputs** for different AI applications
- ✅ **Modern UI** with drag-and-drop, previews, and dark mode

## Tech Stack

### Backend
- Node.js & Express for API and file handling
- Python processing scripts using:
  - NLTK for text processing
  - DateParser for date extraction
  - SentenceTransformers for embeddings
  - Transformers for zero-shot classification

### Frontend
- React with Create React App
- Tailwind CSS for responsive styling
- React Router for navigation
- Heroicons for UI elements

## Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3 with pip
- Git

### Backend Setup
```bash
cd backend
npm install
pip install -r requirements.txt
node server.js  # Runs on http://localhost:4000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

## Directory Structure

```
smart-data-processor/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── requirements.txt
│   └── scripts/
│       ├── generate_jsonl_smart.py
│       └── prepare_finetune_dataset.py
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── index.css
        ├── hooks/
        ├── services/
        ├── components/
        └── pages/
```

## Usage

1. Navigate to the web interface (localhost:3000 in development)
2. Upload one or more `.txt` files via drag-and-drop or file selector
3. Click "Process Files" to start conversion
4. Download your generated datasets:
   - `memories.jsonl` for vector databases and retrieval
   - `finetune_data.jsonl` for model fine-tuning

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Select Create React App as the framework
3. Deploy with default settings

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Configure environment variables:
   ```
   UPLOAD_DIR=uploads
   PYTHON_PATH=python3
   PORT=4000
   ```
3. Deploy and update the frontend API endpoint

## Environment Variables

| Variable      | Description                        | Default   |
|---------------|------------------------------------|-----------|
| `PORT`        | Express server port                | `4000`    |
| `UPLOAD_DIR`  | File storage directory             | `uploads` |
| `PYTHON_PATH` | Python command                     | `python`  |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or issues, please open a GitHub issue or contact the repository owner.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
