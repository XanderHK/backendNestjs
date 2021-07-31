import { RootController } from "./controller";
import { AuthModule } from "./auth/module";
import { Module, NestModule } from "@nestjs/common";
import { ProjectModule } from "./projects/module";
import { dbConnect } from "./database/db";


@Module({
    controllers: [RootController],
    imports : [
        dbConnect(),
        AuthModule,
        ProjectModule,
    ]
})
export class RootModule implements NestModule {
    configure() {
        
    }
}
