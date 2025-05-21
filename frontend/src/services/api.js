import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:4000/api' });
export const uploadFiles = files => {
  const form = new FormData();
  files.forEach(f => form.append('files', f));
  return api.post('/upload', form);
};