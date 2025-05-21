# Smart Data Processor

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Vercel](https://img.shields.io/badge/deployed-vercel-black.svg)
![Render](https://img.shields.io/badge/backend-render-46E3B7.svg)

## 🚀 Live Demo

**Try it now:** [https://smart-data-processor.vercel.app/](https://smart-data-processor.vercel.app/)

Transform your diary entries and text files into AI-ready datasets in seconds!

---

## 🎯 What It Does

Smart Data Processor is a powerful full-stack application that converts plain `.txt` files (diaries, logs, notes) into two structured JSONL datasets optimized for modern AI applications:

1. **Smart JSONL** - Ready for vector embeddings and RAG systems
2. **Fine-tune JSONL** - Perfect for LLM training and customization

---

## ✨ Key Features

- 🎯 **One-Click Processing** - Upload, process, download in under 30 seconds
- 🧠 **AI-Powered Questions** - Intelligent question generation using sentence embeddings
- 🏷️ **Smart Categorization** - Zero-shot topic classification (Work, Family, Travel, etc.)
- 📅 **Date Intelligence** - Automatic date extraction and normalization
- 🔄 **Dual Outputs** - Vector-ready and fine-tuning formats
- 🎨 **Beautiful UI** - Modern design with drag-and-drop, dark mode, and mobile support
- ⚡ **Lightning Fast** - Optimized processing pipeline with real-time progress

---

## 🧱 Architecture

```
smart-data-processor/
├── backend/                          # Node.js + Python Microservice
│   ├── server.js                     # Express API Gateway
│   ├── requirements.txt              # Python ML Dependencies
│   ├── nltk_setup.py                 # NLP Model Downloader
│   └── scripts/
│       ├── generate_jsonl_smart.py   # Core ML Processing Engine
│       └── prepare_finetune_dataset.py # Dataset Formatter
└── frontend/                         # React SPA
    ├── src/
    │   ├── pages/UploadPage.jsx      # Main Interface
    │   ├── components/               # Reusable UI Components
    │   └── services/api.js           # API Client
    └── package.json
```

---

## 🛠 Technology Stack

### 🔧 Backend (Deployed on Render)
- **Runtime:** Node.js 16+ with Express.js
- **ML Engine:** Python 3.8+ with advanced NLP libraries
- **Core Libraries:**
  - `NLTK` - Natural language processing
  - `SentenceTransformers` - Semantic embeddings
  - `Transformers` - Zero-shot classification
  - `DateParser` - Intelligent date extraction
- **File Processing:** Multer with stream handling
- **API:** RESTful endpoints with error handling

### 🎨 Frontend (Deployed on Vercel)
- **Framework:** React 18 with modern hooks
- **Styling:** Tailwind CSS with custom components
- **UI/UX:** Responsive design with Heroicons
- **State Management:** Context API and local state
- **Build Tool:** Create React App with optimization

---

## 📊 Output Examples

### Smart JSONL (`memories.jsonl`)
*Perfect for vector databases and RAG applications*
```json
{
  "input": "What celebration or special event did I participate in?",
  "output": "Today we celebrated Mom's 60th birthday with the whole family.",
  "date": "2024-03-15",
  "topic": "Family"
}
```

### Fine-tune JSONL (`finetune_data.jsonl`)
*Ready for OpenAI, Anthropic, or any LLM provider*
```json
{
  "prompt": "What celebration or special event did I participate in?",
  "completion": "Today we celebrated Mom's 60th birthday with the whole family."
}
```

---

## ⚙️ Local Development Setup

### Prerequisites
- **Node.js** 16+ ([Download here](https://nodejs.org/))
- **Python** 3.8+ ([Download here](https://python.org/downloads/))
- **Git** ([Download here](https://git-scm.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/manojmadduri/smart-data-processor-local.git
cd smart-data-processor-local
```

### 2. Backend Setup
```bash
cd backend
npm install
pip install -r requirements.txt
node server.js
```
✅ **Backend runs on:** `http://localhost:4000`

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm start
```
✅ **Frontend runs on:** `http://localhost:3000`

### 4. Environment Configuration
Create `.env` file in the `frontend` directory:
```bash
REACT_APP_API_URL=http://localhost:4000
```

### 5. Test the Application
1. Open `http://localhost:3000` in your browser
2. Upload a sample `.txt` file
3. Click "Process Files"
4. Download the generated JSONL files

### 🔧 Optional: Custom Configuration
You can modify these settings in your local environment:

**Backend Environment Variables:**
```bash
PORT=4000                    # Server port
UPLOAD_DIR=uploads          # Upload directory
PYTHON_PATH=python3         # Python executable path
```

**Frontend Environment Variables:**
```bash
REACT_APP_API_URL=http://localhost:4000    # Backend API URL
```

---

## 📱 How to Use

1. **📁 Upload Files**
   - Visit the live demo or your local instance
   - Drag & drop your `.txt` files or click to browse
   - Multiple files supported, any size

2. **⚡ Process Data**
   - Click "Process Files" button
   - Watch real-time progress indicator
   - Processing typically takes 15-30 seconds

3. **📥 Download Results**
   - `memories.jsonl` - For Pinecone, Weaviate, ChromaDB
   - `finetune_data.jsonl` - For OpenAI, Claude, Llama fine-tuning

4. **👀 Preview Quality**
   - Use built-in preview to validate outputs
   - Check question quality and topic accuracy



---

## 🐛 Troubleshooting

### Common Issues & Solutions

**Processing Takes Long Time:**
- Large files need 30+ seconds - this is normal
- Check server logs for Python script progress

**CORS Errors:**
- Verify frontend URL in backend CORS config
- Check environment variables are set correctly

**Python Dependencies:**
- Ensure all requirements.txt packages install
- Run `python nltk_setup.py` manually if needed

**File Upload Fails:**
- Check file size limits (default: 50MB)
- Ensure file encoding is UTF-8

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Test on both local and production environments

---

## 📈 Performance & Scalability

- **Concurrent Processing:** Handles multiple file uploads simultaneously
- **Memory Efficient:** Streaming file processing to minimize RAM usage
- **Fast NLP:** Optimized sentence transformers for quick embeddings
- **CDN Delivery:** Frontend assets served via Vercel's global CDN
- **Auto-scaling:** Backend scales automatically on Render

---

## 🔐 Security & Privacy

- **File Security:** Uploaded files are processed and immediately deleted
- **No Data Storage:** Zero permanent data retention
- **HTTPS Only:** All communications encrypted in transit
- **Input Validation:** Comprehensive file type and size validation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Built With ❤️ By

**Manoj Madduri**  
🚀 Full-Stack Developer & AI Enthusiast

📧 **Email:** mmanoj.fall2021@gmail.com  
🔗 **GitHub:** [@manojmadduri](https://github.com/manojmadduri)  
💼 **LinkedIn:** [Connect with Manoj](https://linkedin.com/in/manojmadduri)

---

## 📚 Citation

If you use Smart Data Processor in your research, academic work, or projects, please cite it as:

### **APA Style:**
```
Madduri, M. (2024). Smart Data Processor: AI-Powered Text to JSONL Converter [Software]. 
GitHub. https://github.com/manojmadduri/smart-data-processor-local
```

### **IEEE Style:**
```
M. Madduri, "Smart Data Processor: AI-Powered Text to JSONL Converter," 2024. 
[Online]. Available: https://github.com/manojmadduri/smart-data-processor-local
```

### **BibTeX:**
```bibtex
@software{madduri2024smart,
  title={Smart Data Processor: AI-Powered Text to JSONL Converter},
  author={Madduri, Manoj},
  year={2024},
  url={https://github.com/manojmadduri/smart-data-processor},
  note={Live demo: https://smart-data-processor.vercel.app/}
}
```

### **Chicago Style:**
```
Madduri, Manoj. "Smart Data Processor: AI-Powered Text to JSONL Converter." 
Software. 2024. https://github.com/manojmadduri/smart-data-processor.
```

---

## ⭐ Show Your Support

If this project helped you, please consider:
- ⭐ **Starring** this repository
- 🍴 **Forking** for your own projects
- 📢 **Sharing** with others who might benefit
- 🐛 **Reporting** issues or suggesting improvements
- 📝 **Citing** in your academic work or research

---

*Transform your text into AI-ready datasets in seconds. Start now at [https://smart-data-processor.vercel.app/](https://smart-data-processor.vercel.app/)*
