import { Global, Module } from "@nestjs/common";
import { DialogService } from "src/dialog/dialog.service";
import { MessageService } from "src/message/message.service";
import { GatewayProvider } from "./gateway.provider";

@Global()
@Module({
  providers: [GatewayProvider, DialogService, MessageService],
  exports: [GatewayProvider]
})
export class GatewayModule {

}