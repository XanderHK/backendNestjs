import { RootController } from "./controller";
import { AuthModule } from "./auth/module";
import { Module, NestModule } from "@nestjs/common";
import { ProjectModule } from "./projects/module";


@Module({
    controllers: [RootController],
    imports : [
        AuthModule,
        ProjectModule,
    ]
})
export class RootModule implements NestModule {
    configure() {
        
    }
}