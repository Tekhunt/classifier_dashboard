
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import DashboardPage from './components/DashboardPage';
import ReviewsPage from './components/ReviewPage';
import { AppProvider } from './context/appContext';
import Footer from './components/Footer';

function Layout() {
  const navigate = useNavigate();

  return (
    <AppProvider navigate={navigate}>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-green-600 to-blue-600 flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import HomePage from './components/HomePage';
// import AnalyzePage from './components/AnalyzePage';
// import DashboardPage from './components/DashboardPage';
// import ReviewsPage from './components/ReviewPage';
// import { AppProvider } from './context/appContext';


// function Layout() {
//   const navigate = useNavigate();

//   return (
//     <AppProvider navigate={navigate}>  {/* Pass navigate here */}
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/analyze" element={<AnalyzePage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/reviews" element={<ReviewsPage />} />
//         </Routes>
//       </div>
//     </AppProvider>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;
