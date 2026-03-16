# OpenCodeShare 🔥

> **Instant file & text sharing — files self-destruct in 30 seconds.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://opencodeshare.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Storage-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo

**[https://opencodeshare.vercel.app](https://opencodeshare.vercel.app)**

---

## 😤 The Problem

As developers, we constantly need to send a quick file or code snippet from mobile to PC (or vice versa) — without using WhatsApp, email, or any bloated file sharing service.

**OpenCodeShare solves this permanently.**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💣 **Self-Destruct** | Files & text auto-delete after 30 seconds |
| 📁 **50MB Uploads** | Share large files up to 50MB instantly |
| 🔐 **Zero Digital Footprint** | No traces left online after deletion |
| ⚡ **No Login Required** | Open → Share → Done. No signup ever. |
| 🌙 **Dark & Light Mode** | Beautiful UI in both themes |
| 📋 **Code Snippets** | Share code with syntax highlighting |
| 📱 **Cross Platform** | Works on mobile, tablet, and desktop |

---

## 🧠 Technical Challenge I Solved

**Problem:** Vercel has a **4.5MB API limit** which was blocking large file uploads through the server.

**Solution:** I connected **React directly to Supabase Storage**, completely bypassing the server for file uploads. This enables seamless 50MB uploads with no server bottleneck.

```
Traditional approach:
Client → Server (Vercel) → Storage ❌ (4.5MB limit)

OpenCodeShare approach:
Client → Supabase Storage directly ✅ (50MB works!)
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| **React.js** | Frontend framework |
| **Tailwind CSS** | Styling & UI |
| **Node.js + Express** | Backend API |
| **Supabase** | Database & File Storage |
| **Vercel** | Hosting & Deployment |

---

## 📂 Project Structure

```
OpenCodeShare/
├── frontend/
│   ├── public/
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   └── logo.png
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── routes/
│   ├── index.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Vercel account (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/Taha-Siraj/OpenCodeShare.git

# Go to frontend
cd OpenCodeShare/frontend
npm install

# Go to backend
cd ../backend
npm install
```

### Environment Variables

Create `.env` in frontend folder:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create `.env` in backend folder:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

### Run Locally

```bash
# Frontend
cd frontend
npm run dev

# Backend (separate terminal)
cd backend
npm start
```

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy frontend
cd frontend
vercel --prod

# Deploy backend
cd backend
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Taha Siraj**
- GitHub: [@Taha-Siraj](https://github.com/Taha-Siraj)
- LinkedIn: [Taha Siraj](https://www.linkedin.com/in/taha-siraj-2331952a8/)
- Live: [opencodeshare.vercel.app](https://opencodeshare.vercel.app)

---

## ⭐ Support

Agar ye project useful laga toh **GitHub star** zaroor do! ⭐

[![Star History](https://img.shields.io/github/stars/Taha-Siraj/OpenCodeShare?style=social)](https://github.com/Taha-Siraj/OpenCodeShare)

---

<div align="center">
  <b>Built with ❤️ by Taha Siraj</b><br>
  <a href="https://opencodeshare.vercel.app">opencodeshare.vercel.app</a>
</div>
