import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@UseGuards(JwtAuthGuard)
@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}
  @Post()
  startDialog(@Body() dto: CreateDialogDto) {
   return this.dialogService.startDialog(dto)
  }
  @Get()
  getAllDialogs(@Req() req: IAuthorizedRequest) {
    return this.dialogService.getAllDialogsById(req.user.id)
  }
}
