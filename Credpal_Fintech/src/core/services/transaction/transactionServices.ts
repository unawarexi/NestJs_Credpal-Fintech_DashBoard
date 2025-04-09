export class TransactionServices {
  async getAllTransactions() {
    const response = await fetch('/api/transaction/all');
    return response.json();
  }

  async getTransactionById(transactionId: string) {
    const response = await fetch(`/api/transaction/${transactionId}`);
    return response.json();
  }
}