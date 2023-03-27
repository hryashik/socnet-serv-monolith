import { BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { Transform } from 'class-transformer';
import { validate } from 'class-validator';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';

export interface IReturnedUser {
  email: string;
  id: number;
  avatar: string | null;
  firstName: string | null;
  secondName: string | null;
  displayName: string | null;
  noticeRoomId: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  getUser(user: User): IReturnedUser {
    delete user.hash;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }
  async getUserById(id: number) {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new BadRequestException('Bad request, check credentials')
      delete user.hash;
      return user;
  }
}
