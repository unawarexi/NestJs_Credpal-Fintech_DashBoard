import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionHistoryDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('history/:userId')
  async getTransactionHistory(@Param() params: TransactionHistoryDto) {
    return this.transactionService.getTransactionHistory(params.userId);
  }

  @Get('all')
  async getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }

  // @Get(':transactionId')
  // async getTransactionById(@Param('transactionId') transactionId: string) {
  //   return this.transactionService.getTransactionById(transactionId);
  // }
}
