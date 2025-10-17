// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// import { ArrowLeft, FileText, Upload, BarChart3 } from 'lucide-react';
// import StatCard from './StatCard';

// function DashboardPage({ navigateTo, stats }) {
//   const total = stats.positive + stats.negative + stats.neutral;
  
//   const chartData = [
//     { name: 'Positive', count: stats.positive, fill: '#10b981' },
//     { name: 'Negative', count: stats.negative, fill: '#ef4444' },
//     { name: 'Neutral', count: stats.neutral, fill: '#6b7280' }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <button
//         onClick={() => navigateTo('home')}
//         className="mb-6 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         <span>Back to Home</span>
//       </button>

//       <div className="bg-white rounded-2xl shadow-2xl p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Sentiment Dashboard</h2>
//           <div className="text-gray-600">
//             <span className="font-semibold">Total Reviews: </span>
//             <span className="text-2xl font-bold text-purple-600">{total}</span>
//           </div>
//         </div>
        
//         {total === 0 ? (
//           <div className="text-center py-16">
//             <BarChart3 className="w-24 h-24 mx-auto text-gray-300 mb-4" />
//             <p className="text-xl text-gray-500 mb-4">No data to display yet</p>
//             <button
//               onClick={() => navigateTo('analyze')}
//               className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
//             >
//               Start Analyzing Reviews
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Stats Cards */}
//             <div className="grid md:grid-cols-3 gap-6 mb-12">
//               <StatCard
//                 title="Positive"
//                 count={stats.positive}
//                 percentage={((stats.positive / total) * 100).toFixed(1)}
//                 color="bg-gradient-to-br from-green-400 to-green-600"
//                 icon="😊"
//               />
//               <StatCard
//                 title="Negative"
//                 count={stats.negative}
//                 percentage={((stats.negative / total) * 100).toFixed(1)}
//                 color="bg-gradient-to-br from-red-400 to-red-600"
//                 icon="😞"
//               />
//               <StatCard
//                 title="Neutral"
//                 count={stats.neutral}
//                 percentage={((stats.neutral / total) * 100).toFixed(1)}
//                 color="bg-gradient-to-br from-gray-400 to-gray-600"
//                 icon="😐"
//               />
//             </div>

//             {/* Bar Chart */}
//             <div className="bg-gray-50 rounded-xl p-6">
//               <h3 className="text-xl font-semibold text-gray-700 mb-6">Sentiment Distribution</h3>
//               <ResponsiveContainer width="100%" height={400}>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis 
//                     dataKey="name" 
//                     tick={{ fill: '#374151', fontWeight: 600 }}
//                     axisLine={{ stroke: '#9ca3af' }}
//                   />
//                   <YAxis 
//                     tick={{ fill: '#374151' }}
//                     axisLine={{ stroke: '#9ca3af' }}
//                     label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
//                   />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#ffffff', 
//                       border: '2px solid #e5e7eb',
//                       borderRadius: '8px',
//                       fontWeight: 600
//                     }}
//                   />
//                   <Legend 
//                     wrapperStyle={{ paddingTop: '20px' }}
//                     iconType="circle"
//                   />
//                   <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={100}>
//                     {chartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.fill} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Quick Actions */}
//             <div className="mt-8 flex gap-4 justify-center">
//               <button
//                 onClick={() => navigateTo('reviews')}
//                 className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
//               >
//                 <FileText className="w-5 h-5" />
//                 <span>View All Reviews</span>
//               </button>
//               <button
//                 onClick={() => navigateTo('analyze')}
//                 className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
//               >
//                 <Upload className="w-5 h-5" />
//                 <span>Analyze More</span>
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;


import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, FileText, Upload, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';
import { formatPercentage } from '../utils/sentimentUtils';
import { useAppContext } from '../context/appContext';

function DashboardPage() {
  const { stats, loadStats, loading, error, navigate } = useAppContext();  // Fixed: Added () to call the hook
  const total = (stats?.positive || 0) + (stats?.negative || 0) + (stats?.neutral || 0);  // Optional chaining guard
  
//   useEffect(() => {
//     loadStats();
//   }, [loadStats]);

  useEffect(() => {
  let mounted = true;
  
  const fetchStats = async () => {
    try {
      await loadStats();
    } catch (err) {
      if (mounted) console.error(err);
    }
  };
  
  fetchStats();
  
  return () => {
    mounted = false;
  };
}, []); // Empty array - only run once on mount

  const chartData = [
    { name: 'Positive', count: stats?.positive || 0, fill: '#10b981' },
    { name: 'Negative', count: stats?.negative || 0, fill: '#ef4444' },
    { name: 'Neutral', count: stats?.neutral || 0, fill: '#6b7280' }
  ];

  if (loading) return <div className="text-center py-16 text-white">Loading dashboard...</div>;
  if (error) return <div className="text-center py-16 text-red-300">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sentiment Dashboard</h2>
          <div className="text-gray-600">
            <span className="font-semibold">Total Reviews: </span>
            <span className="text-2xl font-bold text-purple-600">{total}</span>
          </div>
        </div>
        
        {total === 0 ? (
          <div className="text-center py-16">
            <BarChart3 className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-4">No data to display yet</p>
            <button
              onClick={() => navigate('/analyze')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Analyzing Reviews
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <StatCard
                title="Positive"
                count={stats.positive || 0}
                percentage={formatPercentage(stats.positive || 0, total)}
                color="bg-gradient-to-br from-green-400 to-green-600"
                icon="😊"
              />
              <StatCard
                title="Negative"
                count={stats.negative || 0}
                percentage={formatPercentage(stats.negative || 0, total)}
                color="bg-gradient-to-br from-red-400 to-red-600"
                icon="😞"
              />
              <StatCard
                title="Neutral"
                count={stats.neutral || 0}
                percentage={formatPercentage(stats.neutral || 0, total)}
                color="bg-gradient-to-br from-gray-400 to-gray-600"
                icon="😐"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Sentiment Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontWeight: 600 }} axisLine={{ stroke: '#9ca3af' }} />
                  <YAxis tick={{ fill: '#374151' }} axisLine={{ stroke: '#9ca3af' }} label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #e5e7eb', borderRadius: '8px', fontWeight: 600 }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={100}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => navigate('/reviews')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>View All Reviews</span>
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Analyze More</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

