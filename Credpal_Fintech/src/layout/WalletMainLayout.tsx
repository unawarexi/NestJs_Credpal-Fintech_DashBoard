import ActualBalance from '../components/dashboard/ActualBalance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import WalletLeftContainer from '../containers/WalletLeftContainer';
import WalletRightContainer from '../containers/WalletRightContainer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const WalletMainLayout = () => {
  const location = useLocation();

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
      <WalletLeftContainer />
      
      <motion.div 
        className="flex-1 flex flex-col overflow-hidden"
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