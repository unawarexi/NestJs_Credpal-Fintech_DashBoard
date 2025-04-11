/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
  User
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell
} from 'recharts';

// Sample data
const accountBalanceData = [
  { name: 'Jan', balance: 5400 },
  { name: 'Feb', balance: 6200 },
  { name: 'Mar', balance: 5800 },
  { name: 'Apr', balance: 7000 },
  { name: 'May', balance: 8400 },
  { name: 'Jun', balance: 9100 },
  { name: 'Jul', balance: 10200 },
  { name: 'Aug', balance: 12000 },
];

const transactionData = [
  { name: 'Mon', expenses: 320, income: 400 },
  { name: 'Tue', expenses: 280, income: 300 },
  { name: 'Wed', expenses: 450, income: 380 },
  { name: 'Thu', expenses: 390, income: 720 },
  { name: 'Fri', expenses: 480, income: 500 },
  { name: 'Sat', expenses: 600, income: 220 },
  { name: 'Sun', expenses: 350, income: 280 },
];

const spendingCategoryData = [
  { name: 'Housing', value: 35 },
  { name: 'Food', value: 25 },
  { name: 'Transport', value: 15 },
  { name: 'Entertainment', value: 12 },
  { name: 'Shopping', value: 8 },
  { name: 'Others', value: 5 },
];

const recentTransactions = [
  { id: 1, name: 'Amazon', amount: -84.29, type: 'Shopping', date: 'Today, 12:42 PM', icon: '🛒' },
  { id: 2, name: 'Salary Deposit', amount: 3500.00, type: 'Income', date: 'Apr 10, 2025', icon: '💰' },
  { id: 3, name: 'Uber', amount: -22.50, type: 'Transport', date: 'Apr 9, 2025', icon: '🚗' },
  { id: 4, name: 'Starbucks', amount: -4.95, type: 'Food', date: 'Apr 9, 2025', icon: '☕' },
  { id: 5, name: 'Spotify', amount: -9.99, type: 'Entertainment', date: 'Apr 8, 2025', icon: '🎵' },
];

const accountData = [
  { id: 1, name: 'Main Account', balance: 12540.60, cardType: 'Visa', cardNumber: '•••• 4582', color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
  { id: 2, name: 'Savings', balance: 38750.20, cardType: 'Mastercard', cardNumber: '•••• 1237', color: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main Dashboard Component
export default function DashboardOverview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold text-xs">FB</div>
                <span className="ml-2 font-semibold text-gray-900">FinBoard</span>
              </div>
              <button onClick={toggleMobileMenu}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Accounts</a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Transactions</a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Investments</a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Goals</a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Settings</a>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={18} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Alex Morgan</div>
                  <div className="text-xs text-gray-500">alex.morgan@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Financial Dashboard</h1>
            <p className="mt-1 text-xs text-gray-500">Welcome back, Alex. Here's your financial overview for April 2025.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 text-xs font-medium px-3 py-2 rounded-md shadow-sm hover:bg-gray-50">
              Export Report
            </button>
            <button className="bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded-md shadow-sm hover:bg-blue-700">
              + New Transaction
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">Total Balance</span>
                <span className="text-lg font-semibold mt-1">{formatCurrency(51290.80)}</span>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <DollarSign size={18} className="text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUpRight size={14} />
                3.5%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">Monthly Income</span>
                <span className="text-lg font-semibold mt-1">{formatCurrency(4320.50)}</span>
              </div>
              <div className="p-2 bg-green-50 rounded-md">
                <TrendingUp size={18} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUpRight size={14} />
                5.2%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">Monthly Expenses</span>
                <span className="text-lg font-semibold mt-1">{formatCurrency(2870.30)}</span>
              </div>
              <div className="p-2 bg-red-50 rounded-md">
                <PieChart size={18} className="text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="flex items-center text-xs text-red-600 font-medium">
                <ArrowDownRight size={14} />
                2.3%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        </div>

        {/* Cards row */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex space-x-4 min-w-max">
            {accountData.map((account) => (
              <div key={account.id} className="w-64 md:w-80 flex-shrink-0">
                <div className={`${account.color} rounded-lg shadow-md p-4 h-44 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mt-8 -mr-16"></div>
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="text-white text-xs font-medium opacity-80">{account.name}</p>
                      <p className="text-white text-lg font-bold mt-1">{formatCurrency(account.balance)}</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-white text-xs opacity-90">{account.cardNumber}</p>
                        <p className="text-white text-xs font-medium">{account.cardType}</p>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard size={16} className="text-white opacity-80" />
                          <span className="text-white text-xs ml-1 opacity-80">Virtual Card</span>
                        </div>
                        <div className="flex items-center cursor-pointer bg-white bg-opacity-20 px-2 py-1 rounded text-xs text-white">
                          <span>Details</span>
                          <ChevronRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Balance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Balance Overview</h2>
              <div className="flex space-x-2">
                <button className="text-xs py-1 px-2 rounded bg-blue-100 text-blue-700">1W</button>
                <button className="text-xs py-1 px-2 rounded bg-gray-100 text-gray-700">1M</button>
                <button className="text-xs py-1 px-2 rounded bg-gray-100 text-gray-700">3M</button>
                <button className="text-xs py-1 px-2 rounded bg-gray-100 text-gray-700">1Y</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accountBalanceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#1A56DB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '12px' }}
                    formatter={(value) => [`$${value}`, 'Balance']}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#1A56DB" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending categories chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Spending Categories</h2>
              <div className="flex items-center text-xs text-blue-600 cursor-pointer">
                <span>Details</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
            
            <div className="h-48 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={spendingCategoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendingCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '12px' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {spendingCategoryData.slice(0, 4).map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs text-gray-600">{category.name}</span>
                    <span className="ml-1 text-xs font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Income vs Expenses & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expenses */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Income vs Expenses</h2>
              <button className="text-xs text-gray-500">Apr 2025</button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData} barGap={0} barSize={12} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '12px' }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Bar dataKey="income" fill="#10B981" radius={[3, 3, 0, 0]} name="Income" />
                  <Bar dataKey="expenses" fill="#EF4444" radius={[3, 3, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Recent Transactions</h2>
              <div className="flex items-center text-xs text-blue-600 cursor-pointer">
                <span>View All</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {transaction.icon}
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-800">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.type} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                <Clock size={12} className="mr-1" />
                <span>Load more transactions</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}