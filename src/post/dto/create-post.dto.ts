import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePostBody } from './create-post-body';

export class CreatePostDto extends  CreatePostBody{
   @IsNotEmpty()
   @IsNumber()
   userId: number;
}
