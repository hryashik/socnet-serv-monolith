import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPostDto {
   @IsNotEmpty()
   @IsNumber()
   userId: number;

   @IsNotEmpty()
   @IsString()
   text: string;
}
