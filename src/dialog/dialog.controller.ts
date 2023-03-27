import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@UseGuards(JwtAuthGuard)
@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}
  @Post()
  createMessage(
    @Query('dialog') dialogId: string,
    @Body() body: {text: string},
    @Req() req: IAuthorizedRequest
    ) {
      return {
        dialogId,
        text: body.text,
        userId: req.user.id
      }
  }
  @Post('create')
  startDialog(
    @Req() req: IAuthorizedRequest,
    @Body() dto: { usersId: number[]; text: string },
  ) {
    return this.dialogService.startDialog({ ...dto, authorId: req.user.id });
  }
  
  @Get()
  getAllDialogs(@Req() req: IAuthorizedRequest) {
    return this.dialogService.getAllDialogsById(req.user.id);
  }
}
