require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors   = require('cors');
const { spawn } = require('child_process');
const path   = require('path');
const fs     = require('fs');

const app = express();
app.use(cors());

// 1) Ensure upload directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// 2) Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// 3) POST /api/upload
app.post('/api/upload', upload.array('files'), (req, res) => {
  // Combine uploaded files into one data.txt
  const dataPath = path.join(uploadDir, 'data.txt');
  const out = fs.createWriteStream(dataPath);
  req.files.forEach(f => out.write(fs.readFileSync(f.path, 'utf-8') + '\n\n'));
  out.end();

  const pythonCmd = process.env.PYTHON_PATH || 'python';
  const smartPath    = path.join(uploadDir, 'memories.jsonl');
  const finetunePath = path.join(uploadDir, 'finetune_data.jsonl');

  // Run generate_jsonl_smart.py with explicit --output into uploads/
  const gen = spawn(
    pythonCmd,
    ['scripts/generate_jsonl_smart.py', '--input', dataPath, '--output', smartPath],
    { cwd: __dirname }
  );
  let genErr = '';
  gen.stderr.on('data', c => genErr += c.toString());
  gen.on('close', code => {
    if (code !== 0) {
      console.error('[generate_jsonl_smart] stderr:', genErr);
      return res.status(500).send(`Error generating JSONL smart:\n${genErr}`);
    }

    // Run prepare_finetune_dataset.py with explicit --input/--output in uploads/
    const prep = spawn(
      pythonCmd,
      ['scripts/prepare_finetune_dataset.py', '--input', smartPath, '--output', finetunePath],
      { cwd: __dirname }
    );
    let prepErr = '';
    prep.stderr.on('data', c => prepErr += c.toString());
    prep.on('close', code2 => {
      if (code2 !== 0) {
        console.error('[prepare_finetune_dataset] stderr:', prepErr);
        return res.status(500).send(`Error preparing fine-tune dataset:\n${prepErr}`);
      }

      // Success—return relative URIs for download
      res.json({
        smart:    `/api/download/${path.basename(smartPath)}`,
        finetune: `/api/download/${path.basename(finetunePath)}`
      });
    });
  });
});

// 4) GET /api/download/:filename
app.get('/api/download/:filename', (req, res) => {
  const file = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(file)) {
    return res.download(file);
  }
  res.status(404).send(`File not found: ${req.params.filename}`);
});

// 5) Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on port ${port}`));
