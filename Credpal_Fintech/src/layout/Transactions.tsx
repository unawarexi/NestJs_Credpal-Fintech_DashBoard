/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getUserById, getLoggedInUserId } from '../core/services/user/userServices';
import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
  direction: string; // Added direction property
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = await getLoggedInUserId();
        const userData = await getUserById(userId);
        const allTransactions = [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...userData.transactionsSent.map((txn: any) => ({ ...txn, direction: 'Sent' })),
          ...userData.transactionsReceived.map((txn: any) => ({ ...txn, direction: 'Received' })),
        ];
        setTransactions(allTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold mb-6">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-400">
              <th className="px-6 py-3 font-medium">Transaction ID</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Direction</th>
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
                <td className="px-6 py-4 text-sm text-gray-700">{transaction.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{transaction.type}</td>
                <td className="px-6 py-4 text-sm text-gray-700">₦{transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{transaction.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{transaction.direction}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Transactions;
