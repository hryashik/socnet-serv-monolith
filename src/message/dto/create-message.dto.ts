import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  authorId: number

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  dialogId: string
}