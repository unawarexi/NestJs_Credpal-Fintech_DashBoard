// walletpaymentoptions.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BankTransfer from './payment/BankTransfer';
import Cards from './payment/Cards';
import AddPaymentMethod from './payment/AddPaymentMethod';

interface PaymentOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletPaymentOptions: React.FC<PaymentOptionProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const handleContinue = () => {
    if (selectedOption) {
      setShowPaymentDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowPaymentDetails(false);
  };

  const renderPaymentDetails = () => {
    switch (selectedOption) {
      case 'bank':
        return <BankTransfer onClose={handleCloseDetails} />;
      case 'card':
        return <Cards onClose={handleCloseDetails} />;
      case 'addPayment':
        return <AddPaymentMethod onClose={handleCloseDetails} />;
      default:
        return null;
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <AnimatePresence mode="wait">
          {showPaymentDetails ? (
            renderPaymentDetails()
          ) : (
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-medium">Payment Option</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div
                  className={`p-4 border rounded-lg flex items-center cursor-pointer ${
                    selectedOption === 'bank' ? 'border-2 border-yellow-400' : ''
                  }`}
                  onClick={() => setSelectedOption('bank')}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 border rounded-full">
                    {selectedOption === 'bank' && (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg flex items-center cursor-pointer ${
                    selectedOption === 'card' ? 'border-2 border-yellow-400' : ''
                  }`}
                  onClick={() => setSelectedOption('card')}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </span>
                      <span className="font-medium">Add Debit/Credit Card</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 border rounded-full">
                    {selectedOption === 'card' && (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg flex items-center cursor-pointer ${
                    selectedOption === 'addPayment' ? 'border-2 border-yellow-400' : ''
                  }`}
                  onClick={() => setSelectedOption('addPayment')}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                      <span className="font-medium">Add Payment Method</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 border rounded-full">
                    {selectedOption === 'addPayment' && (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={handleContinue}
                  className="w-full py-3 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedOption}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default WalletPaymentOptions;