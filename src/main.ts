import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //Cria uma instância da aplicação NestJS usando o módulo principal AppModule, que configura a aplicação e seus módulos.
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';
  //Configura o fuso horário para a aplicação, garantindo que as operações de data e hora sejam realizadas no fuso horário correto.

  app.useGlobalPipes( new ValidationPipe());
  //Habilita a validação global usando o ValidationPipe, permitindo que as requisições sejam validadas automaticamente com base nas regras
  //definidas nos DTOs (Data Transfer Objects).

  app.enableCors();
  //Habilita o CORS (Cross-Origin Resource Sharing), permitindo que a aplicação seja acessada de diferentes origens,
  //como front-ends hospedados em domínios diferentes.

  await app.listen(process.env.PORT ?? 4000);
  //Inicia a aplicação, fazendo com que ela escute as requisições na porta especificada pela variável de ambiente PORT ou na porta 4000
  //por padrão.
}
bootstrap();//Chama a função bootstrap para iniciar a aplicação NestJS.
