import { Global, Module } from "@nestjs/common";
import { DialogService } from "src/dialog/dialog.service";
import { GatewayProvider } from "./gateway.provider";

@Global()
@Module({
  providers: [GatewayProvider, DialogService],
  exports: [GatewayProvider]
})
export class GatewayModule {

}