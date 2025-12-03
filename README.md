# ClassifyAI Frontend

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-orange)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-blueviolet)](https://tailwindcss.com/)

ClassifyAI is a modern React-based web application for sentiment analysis of customer reviews. It allows users to upload text or CSV files, analyze sentiments using AI-powered APIs, visualize results in interactive dashboards, and manage review data. Built with a focus on responsiveness, performance, and ease of use, it integrates seamlessly with a FastAPI backend for real-time analysis.

## DashBoard UI
<img width="942" height="775" alt="Screenshot 2025-10-26 at 12 40 40" src="https://github.com/user-attachments/assets/37d1ed04-7380-4d28-ac1a-0861baa1bd96" />


## Features
- **Single & Bulk Analysis**: Analyze individual reviews or upload CSV/TXT files for batch processing.
- **Interactive Dashboard**: View sentiment distribution with Recharts bar charts and stat cards.
- **Review Management**: Filter, paginate, and clear reviews with a dedicated page.
- **Responsive Design**: Mobile-friendly navigation with hamburger menu and Tailwind CSS.
- **API Integration**: Dynamic backend calls with fallback simulation for offline/dev mode.
- **Error Handling**: Graceful fallbacks and user-friendly error messages.

## Tech Stack
- **Frontend**: React 18+, Vite (build tool), React Router (routing)
- **UI/Styling**: Tailwind CSS, Lucide React (icons)
- **Charts**: Recharts
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API
- **Utils**: Custom hooks for sentiment simulation and formatting
- **Deployment**: Render (with env vars for API URL)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A running backend server (e.g., FastAPI at `http://localhost:8000/api` for local dev)

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd classifyai-frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root for local dev (optional, uses fallback):
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

### Running Locally
1. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) (or the port shown) in your browser.

3. Test features:
   - Navigate to `/analyze` for sentiment analysis.
   - Upload a sample TXT file with reviews (one per line).
   - View results in `/dashboard` and `/reviews`.

### Environment Variables
| Variable          | Description                          | Default                  |
|-------------------|--------------------------------------|--------------------------|
| `VITE_API_URL`    | Backend API base URL                 | `http://localhost:8000/api` |

Set in `.env` for local; in Render dashboard for prod.

## Deployment
1. Push code to GitHub.
2. Connect to Render: New Web Service → GitHub repo → Build: `npm install && npm run build` → Publish: `npm run preview`.
3. Set `VITE_API_URL` in Render Environment tab to your deployed backend.
4. Deploy—app live at your Render URL (e.g., https://text-classifier-xs9e.onrender.com).

**CORS Note**: Ensure backend allows origins from your frontend domain.

## Project Structure
```
src/
├── components/         # UI components (Navigation, HomePage, etc.)
├── context/            # AppContext for state/API
├── services/           # api.js for backend calls
├── utils/              # sentimentUtils.js, formatters.js
├── App.jsx             # Root with Router/Layout
└── main.jsx            # Entry point
```

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

**Guidelines**:
- Use ESLint/Prettier for code style.
- Write tests for new features (add Jest if needed).
- Update README for changes.

## Acknowledgments
- Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [Tailwind CSS](https://tailwindcss.com/).
- Icons from [Lucide React](https://lucide.dev/).
- Charts powered by [Recharts](https://recharts.org/).
- Inspired by love for AI integration.

---

*Questions? Open an issue or reach out!*
