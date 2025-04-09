// banktransfer.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BankTransferProps {
  onClose: () => void;
}

const BankTransfer: React.FC<BankTransferProps> = ({ onClose }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reference, setReference] = useState('REF-' + Math.floor(100000 + Math.random() * 900000));

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };

  const banks = [
    'Access Bank',
    'Wema Bank',
    'First Bank',
    'GTBank',
    'UBA',
    'Zenith Bank',
    'Fidelity Bank',
    'Stanbic IBTC',
    'Sterling Bank',
    'Union Bank',
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
        <h2 className="text-xl font-medium">Bank Transfer Details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">Please provide your bank details for the transfer</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Select a bank</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="10 digit account number"
              maxLength={10}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-3 border rounded focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Account holder name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Code</label>
            <div className="flex">
              <input
                type="text"
                value={reference}
                readOnly
                className="w-full p-3 border rounded-l focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
              />
              <button 
                className="bg-gray-200 px-4 rounded-r border-t border-r border-b"
                onClick={() => {
                  navigator.clipboard.writeText(reference);
                }}
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Use this reference code when making your transfer</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          className="w-full py-3 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500"
        >
          I have made the transfer
        </button>
      </div>
    </motion.div>
  );
};

export default BankTransfer;