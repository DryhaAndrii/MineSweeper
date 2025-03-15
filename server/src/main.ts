import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const clientUrls = [process.env.CLIENT, process.env.CLIENT2];
  console.log('clientUrls', clientUrls);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: clientUrls,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  /*app.enableCors({ origin: 'http://localhost:5173/' });*/

  await app.listen(PORT, () => console.log(`Server startet on port ${PORT}`));
}
start();
