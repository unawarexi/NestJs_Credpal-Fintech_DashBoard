import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  //   @Post()
  //   async createUser(@Body() userDto: UserDto) {
  //     return this.userService.createUser(userDto);
  //   }

  @Put()
  async updateAllUsers(@Body() updateData: any) {
    return this.userService.updateAllUsers(updateData);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() userDto: Partial<UserDto>,
  ) {
    return this.userService.updateUserById(id, userDto);
  }

  @Delete()
  async deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
