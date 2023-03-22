import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  getMe(@Req() req: IAuthorizedRequest) {
    return this.usersService.getUser(req.user)
  }
}
