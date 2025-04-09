import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaShieldAlt, FaCertificate } from 'react-icons/fa';
import Images from '../../core/constants/ImageStrings';

const LeftContainer: React.FC = () => {
  return (
    <motion.div 
      className="bg-[#0C110D] text-white h-screen w-full p-10  flex flex-col justify-end items-start relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Background wave pattern */}
      <div className="absolute inset-0 z-0">
        <img 
          src={Images.LooperBg} 
          alt="Wave pattern" 
          className="w-full h-full object-cover opacity-50" 
        />
      </div>
      <div className='mx-10 my-20'>
         {/* Logo */}
      <motion.div 
        className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-6 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <span className="text-black font-bold text-xl">B.</span>
      </motion.div>
      
      {/* Main text */}
      <motion.h2 
        className="text-3xl font-bold mb-8 z-10"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Unlock High Returns with Collateralized Equity Asset
      </motion.h2>
      
      {/* Features list */}
      <motion.div 
        className="z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <FaBalanceScale className="text-yellow-500 mr-3" />
          <span>Collateralized</span>
        </div>
        <div className="flex items-center mb-4">
          <FaShieldAlt className="text-yellow-500 mr-3" />
          <span>Secured</span>
        </div>
        <div className="flex items-center">
          <FaCertificate className="text-yellow-500 mr-3" />
          <span>Licensed & regulated</span>
        </div>
      </motion.div>
      </div>
      
     
    </motion.div>
  );
};

export default LeftContainer;