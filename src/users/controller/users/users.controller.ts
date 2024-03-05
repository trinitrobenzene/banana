import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    if (this.userService.checkUsername(dto.username))
      return res.status(400).send({
        message: 'Username already existed.',
      });
    return this.userService.create(dto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    // @Res() res: Response,
  ) {
    // if (this.userService.findById(id) === false)
    //   return res.status(400).send({
    //     message: 'Username already existed.',
    //   });

    return await this.userService.update(id, dto);
  }
}
