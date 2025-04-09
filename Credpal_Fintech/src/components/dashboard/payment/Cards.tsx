// cards.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CardsProps {
  onClose: () => void;
}

const Cards: React.FC<CardsProps> = ({ onClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
//     if (v.length >= 2 && v.length < 5) {
//       return v.slice(0, 2) + '/' + v.slice(2);
//     }
//     return value;
//   };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-medium">Payment details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">Please confirm the margin details</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card details</label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <div className="absolute right-3 top-3">
                <img src="/mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="DD/MM/YY"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="123"
              maxLength={4}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          className="w-full py-3 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500"
        >
          Pay Now
        </button>
      </div>
    </motion.div>
  );
};

export default Cards;