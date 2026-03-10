import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({//Configura a conexão com o banco de dados MySQL, especificando as credenciais e as entidades.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
      logging: true//Habilita o log de consultas SQL no console para fins de depuração.
    }),
    PostagemModule,
    //Instancia o módulo de postagem(PostagemModule), importando o TypeOrmModule para a entidade Postagem, e registrando o controlador e serviço de postagem.

    TemaModule,
    //Instancia o módulo de tema(TemaModule), importando o TypeOrmModule para a entidade Tema, e registrando o controlador e serviço de tema.
    
    UsuarioModule,

    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
