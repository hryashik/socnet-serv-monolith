import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeletePostById {
  @IsNotEmpty()
  @IsNumber() 
  userId: number

  @IsNotEmpty()
  @IsNumber()
  id: number
}