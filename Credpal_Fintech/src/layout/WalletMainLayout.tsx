/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import RenderContent from './RenderContent';
import WalletLeftContainer from '../containers/WalletLeftContainer';
import WalletRightContainer from '../containers/WalletRightContainer';
import useResponsive from '../hooks/UseResponsive';

const WalletMainLayout = () => {
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showLeftContainer, setShowLeftContainer] = useState(false);
  
  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (isDesktop) {
      setShowLeftContainer(false);
    }
  }, [isDesktop]);

  const toggleLeftContainer = () => {
    setShowLeftContainer(!showLeftContainer);
  };

  const closeLeftContainer = () => {
    setShowLeftContainer(false);
  };

  return (
    <div className="flex bg-gray-100 relative w-full">
      {/* Desktop sidebar (always visible) */}
      {isDesktop && (
        <div className="w-64 flex-shrink-0">
          <WalletLeftContainer onClose={closeLeftContainer} />
        </div>
      )}

      {/* Mobile/Tablet sidebar (conditionally visible) */}
      <AnimatePresence>
        {(isMobile || isTablet) && showLeftContainer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLeftContainer}
            />
            
            {/* Sidebar */}
            <WalletLeftContainer onClose={closeLeftContainer} />
          </>
        )}
      </AnimatePresence>

      {/* Toggle button for mobile/tablet */}
      {(isMobile || isTablet) && (
        <button
          className="fixed top-4 left-4 z-30 bg-yellow-500 p-2 rounded-full shadow-lg"
          onClick={toggleLeftContainer}
        >
          <Menu size={24} color="white" />
        </button>
      )}

      {/* Main content area */}
      <motion.div
        className="flex-1 w-full mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <WalletRightContainer>
          <div className="flex-1 overflow-y-auto lg:p-10 p-6 md:max-w-6xl lg:max-w-full mx-auto">
            <motion.h1
              className="text-2xl font-bold mb-6 border-b border-gray-400 pb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {location.pathname.replace('/', '').toUpperCase() || 'WALLET'}
            </motion.h1>
            <RenderContent pathname={location.pathname} />
          </div>
        </WalletRightContainer>
      </motion.div>
    </div>
  );
};

export default WalletMainLayout;