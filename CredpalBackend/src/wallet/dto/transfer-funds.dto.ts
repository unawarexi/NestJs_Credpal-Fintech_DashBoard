import { IsNumber, IsPositive, IsString } from 'class-validator';

export class TransferFundsDto {
  @IsString()
  senderAccount: string;

  @IsString()
  receiverAccount: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
