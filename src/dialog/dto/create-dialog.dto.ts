import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isInt16Array } from 'util/types';

export class CreateDialogDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  usersId: number[];

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsNumber()
  authorId: number
}
