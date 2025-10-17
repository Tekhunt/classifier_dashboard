// import React from 'react';

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl hover:bg-opacity-20 transition-all cursor-pointer">
//       <div className="text-white mb-4 flex justify-center">{icon}</div>
//       <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
//       <p className="text-white opacity-80">{description}</p>
//     </div>
//   );
// }

// export default FeatureCard;


import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
      <div className="text-purple-600 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-800">
        {title}
      </h3>
      <p className="text-gray-600 text-lg">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
