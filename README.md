# 🟢 GFG Campus Club – RIT

A full-stack website for the GeeksforGeeks Campus Club at Ramaiah Institute of Technology.

**Stack:** React (Vite) + TailwindCSS + Flask + SQLite

---

## 📁 Folder Structure

```
gfg-rit/
├── backend/
│   ├── app.py              # Flask API (all routes)
│   ├── requirements.txt    # Python dependencies
│   └── database.db         # Auto-created SQLite DB
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        └── pages/
            ├── Home.jsx
            ├── About.jsx
            ├── Events.jsx
            ├── Resources.jsx
            ├── DSAProblems.jsx
            ├── AIAssistant.jsx
            ├── Contact.jsx
            └── Dashboard.jsx
```

---

## ⚙️ Setup & Run

### Prerequisites
- Python 3.8+
- Node.js 18+

---

### 🔧 Backend Setup

```bash
cd backend
pip install flask flask-cors
python app.py
```

Backend runs at: **http://localhost:5000**

The SQLite database (`database.db`) is **auto-created** with seed data on first run.

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

The Vite dev server **proxies** `/api` calls to Flask automatically.

---

## 🔑 Coordinator Login

| Username | Password  |
|----------|-----------|
| admin    | admin123  |
| coord1   | coord123  |

Visit `/dashboard` → Login → Manage events (Add / Edit / Delete)

---

## 📄 Pages

| Route        | Description                          |
|--------------|--------------------------------------|
| `/`          | Home – Hero, Stats, Members          |
| `/about`     | About the club                       |
| `/events`    | Past / Current / Upcoming events     |
| `/resources` | DSA topics, platforms, learning paths|
| `/dsa`       | Daily DSA Problem of the Day         |
| `/ai`        | AI Coding Assistant (chat UI)        |
| `/contact`   | Contact form + social links          |
| `/dashboard` | Coordinator login + event management |

---

## 🌐 API Endpoints

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/api/login`           | Coordinator authentication     |
| GET    | `/api/stats`           | Club statistics                |
| GET    | `/api/members`         | All members list               |
| GET    | `/api/events`          | All events (filter by `?type=`) |
| POST   | `/api/events`          | Create event (auth required)   |
| PUT    | `/api/events/:id`      | Update event                   |
| DELETE | `/api/events/:id`      | Delete event                   |
| GET    | `/api/problems`        | All DSA problems               |
| GET    | `/api/problems/today`  | Today's problem                |
| POST   | `/api/ai/chat`         | AI assistant response          |
| POST   | `/api/contact`         | Submit contact form            |

---

## 🎨 Design System

| Token         | Value     |
|---------------|-----------|
| Background    | `#0f172a` |
| Card          | `#1e293b` |
| Primary Green | `#00ff9c` |
| Accent Blue   | `#38bdf8` |
| Fonts         | Outfit + JetBrains Mono |

---

## ✅ Features Checklist

- [x] Dark coding theme (GFG inspired)
- [x] Responsive mobile layout
- [x] Animated hero with code terminal
- [x] Animated counters for stats
- [x] Member profile cards
- [x] 3-tab event system (Past/Current/Upcoming)
- [x] Coordinator login + JWT-free session
- [x] Full event CRUD dashboard
- [x] DSA Problem of the Day
- [x] AI coding assistant (keyword-based)
- [x] Contact form with backend storage
- [x] WhatsApp community button
- [x] Smooth hover animations & transitions

---

## 🔗 Customize

- **WhatsApp link**: Search `chat.whatsapp.com/your-group-link` → replace with real link
- **Email**: Search `gfgclub@rit.edu` → replace
- **Members**: Edit seed data in `backend/app.py` → `members_data`
- **AI responses**: Extend `AI_RESPONSES` dict in `backend/app.py`
