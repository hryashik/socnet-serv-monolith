import { Module } from "@nestjs/common";
import { DialogRepositoryService } from "./dialogRepository.service";

@Module({
   providers: [DialogRepositoryService],
   exports: [DialogRepositoryService]
})
export class DialogRepositoryModule {}