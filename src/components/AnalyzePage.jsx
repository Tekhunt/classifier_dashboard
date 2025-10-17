// import React, { useState } from 'react';
// import { ArrowLeft, Upload } from 'lucide-react';
// import ResultCard from './ResultCard';

// function AnalyzePage({ navigateTo, addReview, addBulkReviews }) {
//   const [reviewText, setReviewText] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const analyzeSingleReview = async () => {
//     if (!reviewText.trim()) return;
    
//     setLoading(true);
    
//     // Simulate API call with mock sentiment analysis
//     setTimeout(() => {
//       const mockSentiments = ['positive', 'negative', 'neutral'];
//       const sentiment = mockSentiments[Math.floor(Math.random() * mockSentiments.length)];
//       const confidence = 0.7 + Math.random() * 0.3;
      
//       const reviewData = {
//         text: reviewText,
//         sentiment,
//         confidence
//       };
      
//       setResult(reviewData);
//       addReview(reviewData);
//       setLoading(false);
//     }, 1000);
//   };

//   const analyzeFile = async () => {
//     if (!file) return;
    
//     setLoading(true);
    
//     // Simulate bulk analysis
//     setTimeout(() => {
//       const mockReviews = [
//         { id: 1, text: 'Amazing product! Highly recommend.', sentiment: 'positive', confidence: 0.95 },
//         { id: 2, text: 'Terrible experience, would not buy again.', sentiment: 'negative', confidence: 0.92 },
//         { id: 3, text: 'It works as expected, nothing special.', sentiment: 'neutral', confidence: 0.78 },
//         { id: 4, text: 'Love it! Best purchase this year.', sentiment: 'positive', confidence: 0.91 },
//         { id: 5, text: 'Quality is poor, disappointed.', sentiment: 'negative', confidence: 0.88 },
//       ];
      
//       addBulkReviews(mockReviews);
//       setLoading(false);
//       setFile(null);
//       navigateTo('dashboard');
//     }, 2000);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <button
//         onClick={() => navigateTo('home')}
//         className="mb-6 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         <span>Back to Home</span>
//       </button>
      
//       <div className="bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Analyze Reviews</h2>
        
//         {/* Single Review Analysis */}
//         <div className="mb-12">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Single Review Analysis</h3>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Enter a review to analyze... Example: 'This product exceeded my expectations!'"
//             className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all outline-none"
//             rows="5"
//           />
//           <button
//             onClick={analyzeSingleReview}
//             disabled={loading || !reviewText.trim()}
//             className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Analyzing...' : 'Analyze Review'}
//           </button>
          
//           {result && (
//             <ResultCard 
//               sentiment={result.sentiment} 
//               confidence={result.confidence}
//               onViewAll={() => navigateTo('reviews')}
//             />
//           )}
//         </div>

//         <div className="border-t-2 border-gray-200 my-8"></div>

//         {/* File Upload */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Bulk Analysis</h3>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-all">
//             <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//             <input
//               type="file"
//               accept=".csv,.txt"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="hidden"
//               id="file-upload"
//             />
//             <label htmlFor="file-upload" className="cursor-pointer">
//               <span className="text-purple-600 font-semibold hover:underline">
//                 Choose a CSV file
//               </span>
//               <span className="text-gray-500"> or drag and drop</span>
//             </label>
//             <p className="text-sm text-gray-500 mt-2">CSV files up to 10MB</p>
//             {file && (
//               <p className="mt-4 text-sm text-gray-600 font-medium">
//                 📄 Selected: {file.name}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={analyzeFile}
//             disabled={loading || !file}
//             className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Processing...' : 'Analyze File'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AnalyzePage;



import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { useAppContext } from '../context/appContext';
import ResultCard from './ResultCard';

function AnalyzePage() {
  const { addReview, addBulkReviews, loading, error, setError, navigate } = useAppContext();  // Use context for actions and navigate
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSingleAnalysis = async () => {
    if (!reviewText.trim()) return;
    
    try {
      const data = await addReview(reviewText);
      setResult(data);
      setReviewText('');  // Clear input after success
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  const handleFileAnalysis = async () => {
    if (!file) return;
    
    try {
      // Simple file parsing for text/CSV (enhance with PapaParse for complex CSV)
      const textContent = await file.text();
      const lines = textContent.split('\n').filter(line => line.trim());
      const reviewsToAnalyze = lines.map(line => line.trim());  // Assume each line is a review text
      
      await addBulkReviews(reviewsToAnalyze);
      setFile(null);
      navigate('/dashboard');  // Use context navigate
    } catch (err) {
      console.error('Bulk analysis failed:', err);
      setError('Failed to process file. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}  // Use context navigate
        className="mb-6 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>
      
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Analyze Reviews</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">&times;</button>
          </div>
        )}
        
        {/* Single Review Analysis */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Single Review Analysis</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter a review to analyze... Example: 'This product exceeded my expectations!'"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all outline-none"
            rows="5"
            disabled={loading}
          />
          <button
            onClick={handleSingleAnalysis}
            disabled={loading || !reviewText.trim()}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Review'}
          </button>
          
          {result && (
            <ResultCard 
              sentiment={result.sentiment} 
              confidence={result.confidence}
              onViewAll={() => navigate('/reviews')}  // Use context navigate
            />
          )}
        </div>

        <div className="border-t-2 border-gray-200 my-8"></div>

        {/* File Upload */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Bulk Analysis</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-all">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <input
              type="file"
              accept=".csv,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <span className="text-purple-600 font-semibold hover:underline">
                Choose a CSV/TXT file
              </span>
              <span className="text-gray-500"> or drag and drop</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">Files up to 10MB (one review per line)</p>
            {file && (
              <p className="mt-4 text-sm text-gray-600 font-medium">
                📄 Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>
          <button
            onClick={handleFileAnalysis}
            disabled={loading || !file}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Analyze File'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyzePage;

