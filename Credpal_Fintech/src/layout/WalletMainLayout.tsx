/* eslint-disable @typescript-eslint/no-unused-vars */
import ActualBalance from '../components/dashboard/ActualBalance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import WalletLeftContainer from '../containers/WalletLeftContainer';
import WalletRightContainer from '../containers/WalletRightContainer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import useResponsive from '../hooks/UseResponsive';

const WalletMainLayout = () => {
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showLeftContainer, setShowLeftContainer] = useState(false);

  const toggleLeftContainer = () => {
    setShowLeftContainer(!showLeftContainer);
  };

  const renderContent = () => {
    switch (true) {
      case location.pathname === '/overview' || location.pathname === '/wallet':
        return (
          <div className="flex flex-col md:flex-row gap-6 border-b border-gray-400 pb-10">
            <div className="w-full md:w-2/5">
              <ActualBalance />
            </div>
            <div className="hidden md:block w-px bg-gray-400"></div>
            <div className="w-full md:w-3/5">
              <TransactionHistory />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl">🚧</div>
            <p className="text-lg mt-4">Not available yet</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {(isDesktop || showLeftContainer) && (
        <motion.div
          className={`fixed md:relative z-50 bg-white h-screen w-64 md:w-2/5 ${
            showLeftContainer ? 'block' : 'hidden'
          } md:block`}
          initial={{ x: isDesktop ? 0 : -300 }}
          animate={{ x: showLeftContainer ? 0 : -300 }}
          transition={{ duration: 0.3 }}
        >
          <WalletLeftContainer />
        </motion.div>
      )}

      {(isMobile || isTablet) && (
        <button
          className="fixed top-4 left-4 z-50 bg-yellow-500 p-2 rounded-full shadow-lg"
          onClick={toggleLeftContainer}
        >
          <Menu size={24} color="white" />
        </button>
      )}

      <motion.div
        className={`flex-1 flex flex-col overflow-hidden ${
          isMobile || isTablet ? 'w-full' : 'md:w-3/5'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <WalletRightContainer>
          <div className="flex-1 overflow-y-auto p-6">
            <motion.h1
              className="text-2xl font-bold mb-6 border-b border-gray-400 py-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {location.pathname.replace('/', '').toUpperCase() || 'WALLET'}
            </motion.h1>
            {renderContent()}
          </div>
        </WalletRightContainer>
      </motion.div>
    </div>
  );
};

export default WalletMainLayout;