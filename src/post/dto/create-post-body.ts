import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostBody {
  @IsNotEmpty()
  @IsString()
  text: string
}