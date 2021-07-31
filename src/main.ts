import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser'
import { RootModule } from './module'

async function bootstrap() {
  const app = await NestFactory.create(RootModule)
  app.enableCors({
    origin : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())
  await app.listen(3000);
}
bootstrap();
