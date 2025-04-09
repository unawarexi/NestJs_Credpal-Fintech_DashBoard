import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell } from 'lucide-react';

const WalletHeader = () => {
  return (
    <motion.div 
      className="flex justify-between items-center p-4 border-b border-gray-400"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-1/3 items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-300 rounded-full py-2.5 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>
      
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Bell size={20} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">1</span>
        </motion.div>
        
        <div className="flex items-center gap-2">
          <div className="bg-orange-200 rounded-full h-8 w-8 flex items-center justify-center text-orange-800 font-bold">
            M
          </div>
          <div>
            <span className="text-sm font-medium">Magnartis LTD</span>
            <motion.span
              className="inline-block ml-1"
              animate={{ rotateZ: [0, 180, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              ▼
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletHeader;