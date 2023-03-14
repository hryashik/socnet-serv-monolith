import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './interfaces/dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './interfaces/dto/login.dto';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';

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
      return this.signToken(newUser.email);
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
      const verifiedPassword = argon.verify(user.hash, dto.password);
      if (!user || !verifiedPassword) {
        throw Error
      }
      return this.signToken(user.email);
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

  private signToken(email: string) {
    const token = this.jwtService.sign({ email });
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
}
