/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  FileText, 
  Repeat, 
  Wallet, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  X
} from 'lucide-react';
import Transactions from '../layout/Transactions';
import useResponsive from '../hooks/UseResponsive';

const WalletLeftContainer = ({ onClose }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Overview', route: '/overview' },
    { icon: <Users size={20} />, text: 'Customers', route: '/customers' },
    { icon: <LineChart size={20} />, text: 'Spot Orders', route: '/spot-orders' },
    { icon: <FileText size={20} />, text: 'Margin Orders', route: '/margin-orders' },
    { icon: <Repeat size={20} />, text: 'Transactions', route: '/transactions' },
    { icon: <Wallet size={20} />, text: 'Wallet', route: '/wallet' },
  ];

  const otherMenuItems = [
    { icon: <Bell size={20} />, text: 'Notification', route: '/notification' },
    { icon: <Settings size={20} />, text: 'Settings', route: '/settings' },
    { icon: <LogOut size={20} />, text: 'Logout', route: '/logout' },
    { icon: <HelpCircle size={20} />, text: 'Help', route: '/help' },
  ];

  const [darkMode, setDarkMode] = React.useState(false);

  const handleNavigation = (route: string) => {
    navigate(route);
    if (isMobile || isTablet) {
      onClose();
    }
  };

  return (
    <motion.div 
      className={`fixed lg:relative w-64 bg-[#0C110D] text-white h-screen flex flex-col z-50`}
      initial={{ x: isMobile || isTablet ? -280 : 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isMobile || isTablet ? -280 : 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center">
            <span className="font-bold text-xs md:text-base">B</span> 
          </div>
          <span className="font-bold text-xs md:text-base">BEAM</span>
        </div>
        
        {(isMobile || isTablet) && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-4">
          <div className="px-6 py-2 text-gray-400 text-xs md:text-sm">MAIN</div> 
          <div className="space-y-1">
            {mainMenuItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${location.pathname === item.route ? 'bg-gray-900 border-l-2 border-yellow-500' : 'hover:bg-gray-900'}`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleNavigation(item.route)}
              >
                <span className={`${location.pathname === item.route ? 'text-yellow-500' : 'text-gray-400'}`}>{item.icon}</span>
                <span className={`${location.pathname === item.route ? 'text-yellow-500' : 'text-gray-400'} text-xs md:text-sm`}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="px-6 py-2 text-gray-400 text-xs md:text-sm">OTHERS</div> 
          <div className="space-y-1">
            {otherMenuItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${location.pathname === item.route ? 'bg-gray-900' : 'hover:bg-gray-900'}`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleNavigation(item.route)}
              >
                <span className="text-gray-400">{item.icon}</span>
                <span className="text-gray-400 text-xs md:text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
          <span className="text-sm text-black">Dark mode</span>
          <div 
            className={`w-12 h-6 rounded-full p-1 cursor-pointer ${darkMode ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <motion.div 
              className="bg-white w-4 h-4 rounded-full"
              animate={{ x: darkMode ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </div>
      {location.pathname === '/transactions' && <Transactions />}
    </motion.div>
  );
};

export default WalletLeftContainer;