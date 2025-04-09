// addpayments.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AddPaymentMethodProps {
  onClose: () => void;
}

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({ onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-4V7h2v7h-2z" />
        </svg>
      ),
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-4V7h2v7h-2z" />
        </svg>
      ),
    },
    {
      id: 'momo',
      name: 'Mobile Money',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-4V7h2v7h-2z" />
        </svg>
      ),
    },
    {
      id: 'ussd',
      name: 'USSD Transfer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-4V7h2v7h-2z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-medium">Add Payment Method</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">Select a payment method to add to your account</p>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg flex items-center cursor-pointer transition-all ${
                selectedMethod === method.id ? 'border-2 border-yellow-400 bg-yellow-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span>{method.icon}</span>
                  <span className="font-medium">{method.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 border rounded-full">
                {selectedMethod === method.id && (
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <button
          className="w-full py-3 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedMethod}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default AddPaymentMethod;