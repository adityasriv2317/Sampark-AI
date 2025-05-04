# sampark.ai – Frontend

The frontend of **sampark.ai** is built using React.js and Tailwind CSS. It provides a user-friendly dashboard for BEF staff to upload CSVs, preview and edit email templates, schedule emails, and view analytics.

---

## 🚀 Features

- Upload recipient data via CSV file
- Email template editor with live preview
- AI-generated email content preview
- Bulk email scheduling UI
- Basic analytics dashboard (open rates, RSVPs)
- Responsive, clean, and intuitive UI

---

## 🛠️ Technologies Used

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/) – fast development server
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- [Axios](https://axios-http.com/) – API requests
- [PapaParse](https://www.papaparse.com/) – CSV parsing

---

## 📁 Folder Structure

client/
├── public/
├── src/
│ ├── components/ # UI components
│ ├── pages/ # Main pages (Dashboard, Upload, etc.)
│ ├── services/ # API call logic
│ ├── utils/ # Helpers (CSV parsing, formatters)
│ ├── App.jsx
│ └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json

---

## 🔧 Setup Instructions

### 1. Navigate to the frontend directory

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the `client/` folder:

```bash
# .env
VITE_API_URL=http://localhost:5000

```

> Update the URL based on your backend deployment later.

---

## 🧪 Run the Frontend Locally

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

## 🧩 Build for Production

```bash
npm run build
```

This will generate a production-ready `dist/` folder, which can be served by the backend or a static host like Vercel, Netlify, or Firebase Hosting.

---

## 📄 License

MIT License

Copyright (c) 2023 Sampark.ai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
