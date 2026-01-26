import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoteButton = ({ onClick, disabled, hasVoted }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onClick();
    setLoading(false);
  };

  if (hasVoted) {
    return (
      <Button
        disabled
        className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
      >
        Você já votou
      </Button>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-copper hover:bg-copper/90 text-white py-3 rounded-xl shadow-lg hover:shadow-copper/50 transition-all duration-300"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Votando...
          </>
        ) : (
          <>
            <ThumbsUp className="w-5 h-5 mr-2" />
            Votar neste Prato
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default VoteButton;