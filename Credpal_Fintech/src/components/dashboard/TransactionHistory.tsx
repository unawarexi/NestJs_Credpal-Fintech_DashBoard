import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  status: 'Approved' | 'Liquidated' | 'Awaiting Approval';
  date: string;
}

const TransactionHistory = () => {
  const [activeFilter, setActiveFilter] = useState('3 years');
  const [statusFilter, setStatusFilter] = useState('Approved');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  const transactions: Transaction[] = [
    { id: 'TXN0012345', type: 'Liquidation', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Awaiting Approval', amount: '₦200,000.00', status: 'Liquidated', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Withdrawal', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Approved', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Stock Investment', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '₦200,000.00', status: 'Approved', date: '2024-09-12' },
  ];

  const totalPages = 30;
  const timeFilters = ['3 years', '1 year', '6 months', '30 days'];
  const statusFilters = ['Approved', 'Pending', 'Liquidated'];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Liquidated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Awaiting Approval':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-500';
      case 'Liquidated':
        return 'bg-yellow-500';
      case 'Awaiting Approval':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className=" rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg md:text-xl font-bold mb-6">Transaction History</h2>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <motion.button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeFilter === filter 
                    ? 'bg-gray-200 text-gray-800 font-medium' 
                    : 'bg-gray-100 text-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            {statusFilters.map((filter) => (
              <motion.button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm ${
                  statusFilter === filter 
                    ? 'bg-gray-800 text-white font-medium' 
                    : 'bg-gray-100 text-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatusFilter(filter)}
              >
                {filter}
              </motion.button>
            ))}
            
            <div className="relative">
              <motion.button
                className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-500 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                Filter by
                <ChevronDown size={16} className="ml-1" />
              </motion.button>
              
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">Sort by</div>
                      <button className="px-4 py-2 rounded-lg text-[10px] md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Date (Newest first)</button>
                      <button className="px-4 py-2 rounded-lg text-[10px] md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Date (Oldest first)</button>
                      <button className="px-4 py-2 rounded-lg text-[10px] md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Amount (High to low)</button>
                      <button className="px-4 py-2 rounded-lg text-[10px] md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Amount (Low to high)</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-400">
              <th className="px-6 py-3 font-medium">Transaction ID</th>
              <th className="px-6 py-3 font-medium">Transaction Type</th>
              <th className="px-6 py-3 font-medium">Amount (₦)</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr 
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <td className="px-6 py-4 text-[10px] md:text-sm text-gray-700">{transaction.id}</td>
                <td className="px-6 py-4 text-[10px] md:text-sm text-gray-700">{transaction.type}</td>
                <td className="px-6 py-4 text-[10px] md:text-sm text-gray-700">{transaction.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(transaction.status)}`}></div>
                    <span className={`px-2 py-1 rounded-full text-[10px] md:text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[10px] md:text-sm text-gray-700">{transaction.date}</td>
                <td className="px-6 py-4 text-sm">
                  <motion.button
                    className="text-blue-600 hover:text-blue-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-[10px] md:text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        
        <div className="flex items-center space-x-1">
          <motion.button
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200"
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} className={currentPage === 1 ? "text-gray-300" : "text-gray-600"} />
          </motion.button>
          
          {[1, 2, 3, 4, 5, 6].map((page) => {
            if (page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <motion.button
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === page 
                      ? 'bg-yellow-500 text-white' 
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </motion.button>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="text-gray-500">...</span>;
            }
            return null;
          })}
          
          <motion.button
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200"
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} className={currentPage === totalPages ? "text-gray-300" : "text-gray-600"} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;