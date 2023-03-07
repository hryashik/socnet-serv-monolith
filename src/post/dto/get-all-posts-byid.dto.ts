import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAllPostsByIdDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}