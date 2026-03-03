import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({//Configura a conexão com o banco de dados MySQL, especificando as credenciais e a entidade Postagem.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule
    //Instancia o módulo de postagem, importando o TypeOrmModule para a entidade Postagem, e registrando o controlador e serviço de postagem.
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
