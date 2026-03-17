import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostagemModule,
    //Instancia o módulo de postagem(PostagemModule), importando o TypeOrmModule para a entidade Postagem, e registrando o controlador e serviço de postagem.

    TemaModule,
    //Instancia o módulo de tema(TemaModule), importando o TypeOrmModule para a entidade Tema, e registrando o controlador e serviço de tema.

    UsuarioModule,

    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
