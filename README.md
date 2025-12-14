# Vue.js + Python Full Stack Project

This repository contains a **full‑stack application** with a **Vue.js (Vite) frontend** and a **Python backend**. The project is structured to keep frontend and backend separate, making it easy to develop, maintain, and deploy.

---

## 📁 Project Structure

```text
my-project/
│
├── frontend/          # Vue.js (Vite) frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── backend/           # Python backend
│   ├── app.py         # or main.py
│   ├── requirements.txt
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Tech Stack

### Frontend
- Vue.js 3
- Vite
- JavaScript / TypeScript
- Axios (API calls)

### Backend
- Python
- Flask / FastAPI (update if needed)
- Virtual Environment (`venv`)

---

## ⚙️ Frontend Setup (Vue.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:
```
http://localhost:5173
```

---

## ⚙️ Backend Setup (Python)

### 1️⃣ Create Virtual Environment
```bash
cd backend
python -m venv venv
```

### 2️⃣ Activate Virtual Environment
**Linux / Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Run Backend Server
```bash
python app.py
```

Backend will run at (example):
```
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file in frontend/backend as needed.

Example:
```env
API_URL=http://localhost:5000
SECRET_KEY=your_secret_key
```

⚠️ **Do not commit `.env` files**. Use `.env.example` if required.

---

## 📦 Git Ignore Rules

- `node_modules/`
- `dist/`
- `venv/`
- `.env`

These files are excluded using `.gitignore`.

---

## 📄 Scripts

### Frontend
- `npm run dev` – start development server
- `npm run build` – build for production

### Backend
- `python app.py` – run server

---

## ✅ Best Practices Followed

- Separate frontend & backend
- Environment‑specific configs ignored
- Clean Git history (no dependencies committed)

---

## 🧑‍💻 Author

**Ajay Khatri & FRNDS**

