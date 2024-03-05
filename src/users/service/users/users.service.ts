import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userResposity: Repository<User>,
  ) {}

  async findAll() {
    return await this.userResposity.find();
  }

  find(id: number) {
    return this.userResposity.findOneBy({ id: id });
  }

  create(newUser: CreateUserDto) {
    const result = this.userResposity.create({
      ...newUser,
      createdAt: new Date(),
      changedAt: new Date(),
    });

    try {
      const data = this.userResposity.save(result);
      // return this.response.status(HttpStatus.OK).send(data);
      return { code: 201, message: 'Success', data: data };
    } catch (error) {
      console.log(error);

      // return this.response.status(HttpStatus.BAD_REQUEST).send({ message: 'Failed to save.' });
      return { code: 400, message: 'Some thing went wrong ' };
    }
  }

  // update user information
  async update(id: number, userInfor: UpdateUserDto) {
    let code: number;
    let message: string;

    if (await this.checkUsername(userInfor.username))
      return { code: 400, message: 'Username is already taken.' };

    try {
      const data = this.userResposity.update(
        { id },
        { ...userInfor, changedAt: new Date() },
      );

      console.log(data);
      code = 200;
      message = 'Successfully updated!';
    } catch (error) {
      console.log(error);
      code = 400;
      message = 'Some thing went wrong.';
    }

    return { code, message };
  }

  // check existed user by username
  async checkUsername(username: string) {
    const data = await this.userResposity.findOneBy({ username: username });
    return data ? true : false;
  }

  // check existed user by id
  findById(id: number) {
    const data = this.userResposity.findOneBy({ id: id });
    return data ? true : false;
  }
}
