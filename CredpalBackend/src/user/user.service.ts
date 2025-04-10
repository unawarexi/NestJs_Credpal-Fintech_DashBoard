import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsersWithDetails() {
    console.log('Service: Fetching all users with details');
    try {
      const users = await this.prisma.user.findMany({
        include: {
          wallet: true,
          transactionsSent: true,
          transactionsReceived: true,
        },
      });
      console.log('Service: Returning users with details:', users);
      return users;
    } catch (error) {
      console.error('Error fetching all users with details:', error);
      throw error;
    }
  }

  async getUserByIdWithDetails(id: string) {
    console.log(`Service: Fetching user with ID: ${id} with details`);
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          wallet: true,
          transactionsSent: true,
          transactionsReceived: true,
        },
      });
      console.log('Service: Returning user with details:', user);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${id} with details:`, error);
      throw error;
    }
  }

  async getAllUsers() {
    console.log('Service: Fetching all users');
    try {
      const users = await this.prisma.user.findMany();
      console.log('Service: Returning users:', users);
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  async getUserById(id: string) {
    console.log(`Service: Fetching user with ID: ${id}`);
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      console.log('Service: Returning user:', user);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  async updateAllUsers(updateData: any) {
    console.log('Service: Updating all users with data:', updateData);
    try {
      const result = await this.prisma.user.updateMany({ data: updateData });
      console.log('Service: Update result:', result);
      return result;
    } catch (error) {
      console.error('Error updating all users:', error);
      throw error;
    }
  }

  async updateUserById(id: string, updateData: Partial<UserDto>) {
    console.log(`Service: Updating user with ID: ${id} with data:`, updateData);
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
      console.log('Service: Returning updated user:', user);
      return user;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteAllUsers() {
    console.log('Service: Deleting all users');
    try {
      const result = await this.prisma.user.deleteMany();
      console.log('Service: Delete result:', result);
      return result;
    } catch (error) {
      console.error('Error deleting all users:', error);
      throw error;
    }
  }

  async deleteUserById(id: string) {
    console.log(`Service: Deleting user with ID: ${id}`);
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      console.log('Service: Returning deleted user:', user);
      return user;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }
}
