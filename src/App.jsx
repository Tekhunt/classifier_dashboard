import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import DashboardPage from './components/DashboardPage';
import ReviewsPage from './components/ReviewPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/appContext';
import { AuthProvider } from './context/authContext';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function Layout() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <AppProvider navigate={navigate}>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-green-600 to-blue-600 flex flex-col relative">
          <Navigation />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/analyze"
                element={
                  <ProtectedRoute>
                    <AnalyzePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute>
                    <ReviewsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Chatbot Fixed Bottom-Right */}
          <div className="fixed bottom-4 right-4 z-50">
            <Chatbot />
          </div>
        </div>
      </AppProvider>
    </AuthProvider>
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
// import Footer from './components/Footer';
// import Chatbot from './components/Chatbot';


// function Layout() {
//   const navigate = useNavigate();

//   return (
//     <AppProvider navigate={navigate}>
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-green-600 to-blue-600 flex flex-col relative">

//         <Navigation />

//         <main className="flex-1">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/analyze" element={<AnalyzePage />} />
//             <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/reviews" element={<ReviewsPage />} />
//           </Routes>
//         </main>

//         <Footer />

//         {/* Chatbot Fixed Bottom-Right */}
//         <div className="fixed bottom-4 right-4 z-50">
//           <Chatbot />
//         </div>

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
