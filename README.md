```markdown
# Smart Data Processor

Convert any collection of plain‐text `.txt` files (diaries, logs, notes) into two structured JSONL datasets:

- **Smart JSONL** (`memories.jsonl`):  
  Each line is a JSON object containing:
  - `input`: a generated “smart” question (e.g. “What event or celebration did I participate in?”)
  - `output`: the original sentence from your text
  - `date`: a normalized `YYYY-MM-DD` date
  - `topic`: a high-level category (Work, Family, Travel, etc.)  
  Ideal for **vector embedding** and **RAG-style retrieval**.

- **Fine-tune JSONL** (`finetune_data.jsonl`):  
  Each line is a JSON object containing:
  - `prompt`: the same question as in Smart JSONL
  - `completion`: the original sentence  
  Ready to upload to your LLM provider (OpenAI, etc.) for **fine-tuning**.

---

## Table of Contents

1. [Features](#features)  
2. [Architecture & Tech Stack](#architecture--tech-stack)  
3. [Repository Structure](#repository-structure)  
4. [Local Setup](#local-setup)  
   - [Prerequisites](#prerequisites)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
5. [Usage](#usage)  
6. [Deployment](#deployment)  
   - [Frontend on Vercel](#frontend-on-vercel)  
   - [Backend on Railway](#backend-on-railway)  
7. [Configuration & Environment Variables](#configuration--environment-variables)  
8. [Contributing & Support](#contributing--support)  
9. [License](#license)

---

## Features

- **Instant conversion** of `.txt` files into JSONL  
- **Intelligent question generation** via sentence embeddings  
- **Zero-shot topic classification** (Work, Family, Travel, …)  
- **Date extraction & normalization**  
- **Dual outputs**: one for vector retrieval, one for model fine-tuning  
- **Responsive React UI** with drag-and-drop upload, previews, and downloads  
- **Light & dark themes** with simple neutral styling  

---

## Architecture & Tech Stack

- **Backend**  
  - Node.js + Express (file upload, child‐process orchestration)  
  - Python 3 scripts  
    - `generate_jsonl_smart.py` (NLTK, DateParser, SentenceTransformers, Transformers)  
    - `prepare_finetune_dataset.py`  
  - Deployable on Railway (auto Node + Python support)

- **Frontend**  
  - React (Create React App)  
  - Tailwind CSS for utility-first styling  
  - React Router for multi-page flow  
  - Heroicons for SVG icons  
  - Deployable on Vercel  

---

## Repository Structure

```

smart-data-processor/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── requirements.txt
│   └── scripts/
│       ├── generate\_jsonl\_smart.py
│       └── prepare\_finetune\_dataset.py
└── frontend/
├── package.json
├── public/
│   └── index.html
└── src/
├── App.jsx
├── index.jsx
├── index.css
├── hooks/useTheme.js
├── services/api.js
├── components/
│   ├── NavBar.jsx
│   ├── FileUploader.jsx
│   ├── ProgressSpinner.jsx
│   ├── DownloadLinks.jsx
│   └── JSONPreviewModal.jsx
└── pages/
├── Home.jsx
└── UploadPage.jsx

````

---

## Local Setup

### Prerequisites

- **Git**  
- **Node.js & npm** (v16+)  
- **Python 3** (with `pip`)  

### Backend

1. ```bash
   cd backend
   npm install
   pip install -r requirements.txt
````

2. (Optional) If you need to force UTF-8 output in Windows consoles, add at the top of each script:

   ```python
   import sys
   if hasattr(sys.stdout, "reconfigure"):
       sys.stdout.reconfigure(encoding="utf-8")
   ```
3. ```bash
   node server.js
   ```

   The backend listens on `http://localhost:4000`.

### Frontend

1. ```bash
   cd frontend
   npm install
   ```
2. ```bash
   npm start
   ```

   The React app runs at `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000` in your browser.
2. Click **Get Started** (or **Upload** in the navbar).
3. Drag & drop or select one or more `.txt` files.
4. Click **Process Files**.
5. Download your **Smart JSONL** and **Fine-tune JSONL** via the buttons.
6. (Optional) Preview the first few lines in the modal.

---

## Deployment

### Frontend on Vercel

1. Sign in at [Vercel](https://vercel.com) with GitHub.
2. **New Project → Import Git Repository** → select your repo.
3. Framework Preset: **Create React App**

   * Build Command: `npm run build`
   * Output Directory: `build`
4. **Deploy** → get `https://<your-app>.vercel.app`

### Backend on Railway

1. Sign in at [Railway](https://railway.app) with GitHub.

2. **New Project → Deploy from GitHub** → select your repo’s **backend/** folder.

3. In Railway Settings → Environment Variables, add:

   ```
   UPLOAD_DIR=uploads
   PYTHON_PATH=python3
   PORT=4000
   ```

4. **Deploy** → get `https://<your-backend>.railway.app`

5. In your frontend (e.g. `src/services/api.js`), point `baseURL` to your Railway URL:

   ```js
   export const api = axios.create({
     baseURL: 'https://<your-backend>.railway.app/api'
   });
   ```

---

## Configuration & Environment Variables

| Key           | Description                                     | Default   |
| ------------- | ----------------------------------------------- | --------- |
| `PORT`        | HTTP port for Express server                    | `4000`    |
| `UPLOAD_DIR`  | Directory to store uploaded files & outputs     | `uploads` |
| `PYTHON_PATH` | Python interpreter command (`python3`/`python`) | `python`  |

---

## Contributing & Support

* Feel free to open issues or pull requests on GitHub:
  `https://github.com/manojmadduri/smart-data-processor`
* For usage questions, create an issue or contact me at **manojmadduri** on GitHub.

---

## License

This project is released under the **MIT License**. See [LICENSE](LICENSE) for details.

```
```
