import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@UseGuards(JwtAuthGuard)
@Controller('dialogs')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}
  @Post()
  createMessage(
    @Query('id') dialogId: string,
    @Body() body: { text: string },
    @Req() req: IAuthorizedRequest,
  ) {
    const dto = {
      authorId: req.user.id,
      text: body.text,
      dialogId
    }
    return this.dialogService.addMessage(dto);
  }
  @Post('create')
  startDialog(
    @Req() req: IAuthorizedRequest,
    @Body() dto: { usersId: number[]; text: string },
  ) {
    return this.dialogService.startDialog({ ...dto, authorId: req.user.id });
  }

  @Get()
  getAllDialogs(@Req() req: IAuthorizedRequest, @Query('id') dialogId: string) {
    if (dialogId) {
      return this.dialogService.getDialogById({
        userId: req.user.id,
        dialogId,
      });
    }
    return this.dialogService.getAllDialogsById(req.user.id);
  }
}
