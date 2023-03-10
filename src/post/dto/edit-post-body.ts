import { IsNotEmpty, IsString } from "class-validator";

export class EditPostBody {
  @IsNotEmpty()
  @IsString()
  text: string
}