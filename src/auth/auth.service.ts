import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './interfaces/dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './interfaces/dto/login.dto';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async signup(dto: SignUpDto) {
    try {
      const hash = await this.hashPassword(dto.password);
      const newUser = await this.usersRepository.create(dto.email, hash)
      return this.signToken(newUser.email, newUser.id);
    } catch (error) {
      //P2002 - prisma error if unique field is taken
      if (error.code === 'P2002')
        throw new ForbiddenException('Credentials is taken');
      throw new Error(error);
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.usersRepository.findByEmail(dto.email)
      const verifiedPassword = await argon.verify(user.hash, dto.password);
      if (!user || !verifiedPassword) {
        throw Error
      }
      return this.signToken(user.email, user.id);
    } catch (error) {
      throw new ForbiddenException('incorrect credentials');
    }
  }

  private hashPassword(password: string): Promise<string> {
    const hash = argon.hash(password, {
      saltLength: 8,
    });
    return hash;
  }

  private signToken(email: string, id: number) {
    const token = this.jwtService.sign({ email: email, sub: id });
    return {
      access_token: token,
    };
  }

  public decodeToken(token: string) {
    const parseToken = token.split('Bearer ')[1];
    /* console.log(this.jwtService.verify(token)) */
    // @ts-ignore
    const { email } = this.jwtService.decode(parseToken);
    return email;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email)
  }
}
