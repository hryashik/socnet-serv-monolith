import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EditPostByIdDto{
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  id: number
}