import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(PORT);
  console.log('Server started on ' + PORT)
}
bootstrap();
