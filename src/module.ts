import { RootController } from "./controller";
import { AuthModule } from "./routes/auth/module";
import { Module, NestModule } from "@nestjs/common";
import { ProjectModule } from "./routes/projects/module";
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
