import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AddFundsDto, WithdrawFundsDto, TransferFundsDto } from './dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('addfunds/:userId')
  async addFunds(
    @Param('userId') userId: string,
    @Body() addFundsDto: AddFundsDto,
  ) {
    return this.walletService.addFunds(userId, addFundsDto.amount);
  }

  @Post('withdraw/:userId')
  async withdrawFunds(
    @Param('userId') userId: string,
    @Body() withdrawFundsDto: WithdrawFundsDto,
  ) {
    return this.walletService.withdrawFunds(userId, withdrawFundsDto.amount);
  }

  @Post('transfer')
  async transferFunds(@Body() transferFundsDto: TransferFundsDto) {
    const { senderAccount, receiverAccount, amount } = transferFundsDto; // Use account numbers
    return this.walletService.transferFunds(
      senderAccount,
      receiverAccount,
      amount,
    );
  }

  @Get(':userId')
  async getWalletBalance(@Param('userId') userId: string) {
    return this.walletService.getWalletBalance(userId);
  }
}
