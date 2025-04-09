import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getWalletBalance(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      select: { balance: true, userId: true },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async addFunds(userId: string, amount: number) {
    console.log('Received amount:', amount); // Debugging log

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      // Enhanced validation
      throw new BadRequestException(
        'Amount must be a valid number greater than zero',
      );
    }

    try {
      // Use a transaction to ensure both operations complete or fail together
      return await this.prisma.$transaction(async (prisma) => {
        // Find or create wallet
        let wallet = await prisma.wallet.findUnique({ where: { userId } });

        if (!wallet) {
          // Check if user exists
          const userExists = await prisma.user.findUnique({
            where: { id: userId },
          });
          if (!userExists) {
            throw new NotFoundException('User not found');
          }

          wallet = await prisma.wallet.create({
            data: {
              userId,
              balance: 0,
            },
          });
        }

        // Update wallet balance
        const updatedWallet = await prisma.wallet.update({
          where: { userId },
          data: { balance: { increment: amount } },
        });

        // Record transaction
        await prisma.transaction.create({
          data: {
            amount,
            type: 'DEPOSIT',
            description: 'Funds added to wallet',
            senderId: null,
            receiverId: userId,
          },
        });

        return {
          ...updatedWallet,
          message: `Successfully added ${amount} to wallet`,
        };
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async withdrawFunds(userId: string, amount: number) {
    console.log('Received amount:', amount); // Debugging log

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      // Enhanced validation
      throw new BadRequestException(
        'Amount must be a valid number greater than zero',
      );
    }

    try {
      // Use a transaction to ensure both operations complete or fail together
      return await this.prisma.$transaction(async (prisma) => {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });

        if (!wallet) {
          throw new NotFoundException('Wallet not found');
        }

        if (wallet.balance < amount) {
          throw new BadRequestException('Insufficient balance');
        }

        // Update wallet balance
        const updatedWallet = await prisma.wallet.update({
          where: { userId },
          data: { balance: { decrement: amount } },
        });

        // Record transaction
        await prisma.transaction.create({
          data: {
            amount,
            type: 'WITHDRAWAL',
            description: 'Funds withdrawn from wallet',
            senderId: userId,
            receiverId: null,
          },
        });

        return {
          ...updatedWallet,
          message: `Successfully withdrew ${amount} from wallet`,
        };
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async transferFunds(
    senderAccount: string,
    receiverAccount: string,
    amount: number,
  ) {
    console.log('Received amount:', amount); // Debugging log

    if (senderAccount === receiverAccount) {
      throw new BadRequestException(
        'Cannot transfer funds to the same account',
      );
    }

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new BadRequestException(
        'Amount must be a valid number greater than zero',
      );
    }

    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Validate sender account
        const sender = await prisma.user.findUnique({
          where: { accountNumber: senderAccount },
          include: { wallet: true },
        });

        if (!sender || !sender.wallet) {
          throw new NotFoundException('Sender account not found');
        }

        if (sender.wallet.balance < amount) {
          throw new BadRequestException('Insufficient balance');
        }

        // Validate receiver account
        const receiver = await prisma.user.findUnique({
          where: { accountNumber: receiverAccount },
          include: { wallet: true },
        });

        if (!receiver) {
          throw new NotFoundException('Receiver account not found');
        }

        // Ensure receiver has a wallet
        let receiverWallet = receiver.wallet;
        if (!receiverWallet) {
          receiverWallet = await prisma.wallet.create({
            data: {
              userId: receiver.id,
              balance: 0,
            },
          });
        }

        // Update sender's balance
        await prisma.wallet.update({
          where: { userId: sender.id },
          data: { balance: { decrement: amount } },
        });

        // Update receiver's balance
        await prisma.wallet.update({
          where: { userId: receiver.id },
          data: { balance: { increment: amount } },
        });

        // Record transaction
        await prisma.transaction.create({
          data: {
            amount,
            type: 'TRANSFER',
            description: 'Funds transferred',
            senderId: sender.id,
            receiverId: receiver.id,
          },
        });

        return {
          success: true,
          message: `Successfully transferred ${amount} from account ${senderAccount} to account ${receiverAccount}`,
        };
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`Database error: ${error.message}`);
      }
      throw error;
    }
  }
}
