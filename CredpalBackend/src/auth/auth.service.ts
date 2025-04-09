import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'; // Add ConflictException
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto'; // Update import
// import { LoginDto } from './dto/login.dto'; // Import LoginDto

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateUniqueAccountNumber(): Promise<string> {
    const generateRandomNumber = () =>
      Math.floor(10 ** 9 + Math.random() * 9 * 10 ** 9).toString(); // Generate 10-12 digit number

    let accountNumber: string;
    let isUnique = false;

    while (!isUnique) {
      accountNumber = generateRandomNumber();
      const existingUser = await this.prisma.user.findUnique({
        where: { accountNumber },
      });
      if (!existingUser) {
        isUnique = true;
      }
    }

    return accountNumber;
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Generate unique account number
    const accountNumber = await this.generateUniqueAccountNumber();

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hash: hashedPassword,
          accountNumber, // Attach generated account number
        },
      });
      delete user.hash; // Remove the hash from the user object before returning
      return { message: 'User registered successfully', user };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email or account number already exists');
      }
      throw error;
    }
  }

  async login(email: string, password: string) {
    console.log('Login attempt with email:', email); // Debugging log
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      console.log('User not found for email:', email); // Debugging log
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      console.log('Invalid password for email:', email); // Debugging log
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    console.log('Login successful for email:', email); // Debugging log
    return this.jwtService.sign(payload);
  }
}
