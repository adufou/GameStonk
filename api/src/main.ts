import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppValidationPipeOptions from "./app.validation-pipe-options";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(AppValidationPipeOptions));
  await app.listen(3000);
}
bootstrap();
