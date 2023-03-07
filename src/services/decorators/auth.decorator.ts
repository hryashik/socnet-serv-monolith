import { SetMetadata } from '@nestjs/common';

export function Authorization(secured: boolean) {
 return SetMetadata('secured', secured);
};
