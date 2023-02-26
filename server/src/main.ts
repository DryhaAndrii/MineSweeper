import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  /*app.enableCors({ origin: 'http://localhost:5173/' });*/

  await app.listen(PORT, () => console.log(`Server startet on port ${PORT}`));
}
start();
