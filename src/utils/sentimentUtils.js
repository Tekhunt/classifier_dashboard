// utils/sentimentUtils.js
export const simulateSentiment = (text) => {
  const positive = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome', 'outstanding', 'superb', 'brilliant'];
  const negative = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointed', 'poor', 'useless', 'waste', 'disgusting', 'pathetic', 'broken'];
  
  const lowerText = text.toLowerCase();
  const hasPositive = positive.some(word => lowerText.includes(word));
  const hasNegative = negative.some(word => lowerText.includes(word));
  
  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

// utils/sampleData.js
export const sampleReviews = [
  "This product is absolutely amazing! Best purchase I've ever made!",
  "Terrible quality, complete waste of money. Very disappointed.",
  "It's okay, nothing special but does the job.",
  "Outstanding quality! Exceeded all my expectations!",
  "Horrible experience. The product broke within a day.",
  "Pretty good value for the price. Satisfied with my purchase.",
  "Not impressed. Expected much better for this price point.",
  "Fantastic! Would definitely recommend to everyone!",
  "Average product with some pros and cons.",
  "Worst purchase ever! Stay away from this product!",
  "Excellent customer service and fast shipping!",
  "Mediocre at best. There are better alternatives.",
  "Love it! Works perfectly and looks great too.",
  "Defective product. Had to return immediately.",
  "Good enough for basic needs. Nothing extraordinary."
];

// utils/formatters.js
export const formatConfidence = (confidence) => {
  return (confidence * 100).toFixed(1);
};

export const formatPercentage = (value, total) => {
  if (total === 0) return '0';
  return ((value / total) * 100).toFixed(1);
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};