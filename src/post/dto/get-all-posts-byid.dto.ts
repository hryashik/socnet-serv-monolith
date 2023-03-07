import { IsNotEmpty, IsNumber } from "class-validator";

export class getAllPostsByIdDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}