import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, Copy } from 'lucide-react';
import WalletPaymentOptions from './WalletPaymentOption'; // Import the modal component

const ActualBalance = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false); // State for modal visibility

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleCopyBankDetails = () => {
    navigator.clipboard.writeText("Wema Bank 010 210 2020");
    // Add toast notification logic here
  };

  const handleAddFundsClick = () => {
    setIsWalletModalOpen(true); // Open the modal
  };

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false); // Close the modal
  };

  return (
    <>
      <motion.div 
        className="bg-gray-50 rounded-lg p-6 mb-6 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='bg-zinc-100 p-4 rounded-lg'>
          <div className="flex bg-zinc-0 justify-between items-center mb-6 border-b border-gray-400 py-4 ">
            <h3 className="text-gray-500 font-medium text-xs md:text-sm">Actual Balance</h3>
            <motion.div 
              className="bg-gray-200 p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard size={20} className="text-gray-600" />
            </motion.div>
          </div>
          
          <motion.div
            className="text-3xl font-bold mb-6 border-b border-gray-300 py-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            ₦200,000<span className="text-lg font-normal text-gray-500">.00</span>
          </motion.div>
          
          <div className="flex items-center mb-6 border-b border-gray-400 py-4">
            <div className="text-gray-700 mr-2 text-xs md:text-sm">Wema Bank 010 210 2020</div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyBankDetails}
            >
              <Copy size={16} className="text-gray-500" />
            </motion.button>
          </div>
          
          <div className=" border-dashed border-gray-300  ">
            <div className="flex justify-between items-center mb-10 border-b border-gray-300 py-4">
              <h3 className="text-gray-500 font-medium text-xs md:text-sm">Pending Amount</h3>
              <motion.div 
                className="bg-gray-200 p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Clock size={20} className="text-gray-600" />
              </motion.div>
            </div>
            
            <div className="text-3xl font-bold mt-2">
              ₦0<span className="text-lg font-normal text-gray-500">.00</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-6">
          <motion.button
            className="bg-yellow-400 text-black py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddFundsClick} // Open modal on click
          >
            Add Funds
          </motion.button>
          <motion.button
            className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.97 }}
          >
            Withdrawal
          </motion.button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2">
          <motion.button
            className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.97 }}
          >
            PND Amount
          </motion.button>
          <motion.button
            className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.97 }}
          >
            Place Lien
          </motion.button>
          <motion.button
            className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.97 }}
          >
            Freeze Wallet
          </motion.button>
        </div>
      </motion.div>

      {/* WalletPaymentOptions Modal */}
      <WalletPaymentOptions 
        isOpen={isWalletModalOpen} 
        onClose={handleCloseWalletModal} 
      />
    </>
  );
};

export default ActualBalance;