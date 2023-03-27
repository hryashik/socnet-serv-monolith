import { Module } from "@nestjs/common";
import { MessagesRepositoryService } from "./messagesRepository.service";

@Module({
   providers: [MessagesRepositoryService],
   exports: [MessagesRepositoryService]
})
export class MessagesRepositoryModule {}