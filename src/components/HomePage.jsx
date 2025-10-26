import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate directly
import FeatureCard from './FeatureCard';
import { Upload, TrendingUp, BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/appContext';  // Keep for other context if needed

function HomePage() {
  const navigate = useNavigate();  // Use directly—no context needed for nav
  const { /* other context if needed, e.g., stats */ } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center text-white space-y-8">
        <h1 className="text-6xl font-bold mb-4">Welcome to ClassifyAI</h1>
        <p className="text-2xl opacity-90 mb-8">
          Analyze customer reviews and classify sentiments with cutting-edge AI
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={<Upload className="w-12 h-12" />}
            title="Upload Reviews"
            description="Import your review data from CSV files or analyze text directly"
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12" />}
            title="AI Analysis"
            description="Advanced sentiment analysis using machine learning algorithms"
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12" />}
            title="Visualize Data"
            description="Beautiful interactive charts showing sentiment distribution"
          />
        </div>

        <button
          onClick={() => navigate('/analyze')}  // Now a real function
          className="mt-12 px-8 py-4 bg-white text-purple-600 rounded-lg text-xl font-bold hover:scale-105 transition-transform shadow-xl"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default HomePage;
