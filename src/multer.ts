import { DynamicModule } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "./utils/file.utils";

export const storage = () : DynamicModule => {
    return MulterModule.register({
    storage : diskStorage({
        destination: './uploads',
        filename: editFileName,
    }),
    fileFilter : imageFileFilter
  })
}