import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, color = 'copper' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-500',
    copper: 'from-copper/20 to-copper/5 border-copper/30 text-copper',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-500',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={colorClasses[color].split(' ')[2]}>
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </motion.div>
  );
};

export default StatCard;