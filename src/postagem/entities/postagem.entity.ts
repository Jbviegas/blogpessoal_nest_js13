import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: 'tb_postagens' })//Criando a tabela no banco de dados / CREATE TABLE tb_postagens
export class Postagem {//Definindo a entidade Postagem, que representa a tabela tb_postagens no banco de dados. 
// A anotação @Entity é usada para marcar a classe como uma entidade do TypeORM, e o nome da tabela é especificado como 'tb_postagens'.

    @PrimaryGeneratedColumn()//Gerar o id automaticamente /PRIMARY KEY id INT AUTO_INCREMENT
    id: number;


    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 100, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE titulo VARCHAR(255) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Length(10, 1000, { message: "O texto deve ter entre 10 e 1000 caracteres" })
    //Validação para aceitar apenas textos com comprimento entre 10 e 1000 caracteres
    @Column({ length: 1000, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE texto VARCHAR(255) NOT NULL
    texto: string;


    @UpdateDateColumn()//Criar a coluna de data de atualização no banco de dados / CREATE TABLE data DATETIME
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {//Lá em Tema, a propriedade postagem é um array de Postagem(postagem: Postagem[]),
    // indicando que um tema pode ter várias postagens associadas a ele.
    
    //A anotação @ManyToOne é usada para definir um relacionamento de muitos para um entre a entidade Postagem e a entidade Tema.
    //A função de retorno de chamada () => Tema é usada para indicar que a entidade relacionada é a entidade Tema.

    //O segundo argumento (tema) => tema.postagem é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Tema tem uma propriedade chamada postagem que se relaciona com a entidade Postagem.

        onDelete: "CASCADE"
    //A opção onDelete: "CASCADE" é usada para definir o comportamento de exclusão em cascata, o que significa que quando um tema for excluído,
    //  todas as postagens associadas a esse tema também serão excluídas automaticamente do banco de dados.
    })
    tema: Tema;//A propriedade tema é do tipo Tema, indicando que cada postagem está associada a um tema específico.
    //Essa associação permite que as postagens sejam organizadas e categorizadas com base nos temas aos quais pertencem.
    //Representa a chave estrangeira que estabelece o relacionamento entre a tabela de postagens e a tabela de temas no banco de dados.

    
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {//Lá em Usuario, a propriedade postagem é um array de Postagem(postagem: Postagem[]),
    // indicando que um usuario pode ter várias postagens associadas a ele.

    //A anotação @ManyToOne é usada para definir um relacionamento de muitos para um entre a entidade Postagem e a entidade Usuario.
    //A função de retorno de chamada () => Usuario é usada para indicar que a entidade relacionada é a entidade Usuario.

    //O segundo argumento (tema) => tema.postagem é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Tema tem uma propriedade chamada postagem que se relaciona com a entidade Postagem.

        onDelete: "CASCADE"
    //A opção onDelete: "CASCADE" é usada para definir o comportamento de exclusão em cascata, o que significa que quando um tema for excluído,
    //  todas as postagens associadas a esse tema também serão excluídas automaticamente do banco de dados.
    })
    usuario: Usuario;//A propriedade usuario é do tipo Usuario, indicando que cada postagem está associada a um usuário específico.
    //Essa associação permite que as postagens sejam organizadas e categorizadas com base nos usuários aos quais pertencem.
    //Representa a chave estrangeira que estabelece o relacionamento entre a tabela de postagens e a tabela de usuários no banco de dados.
}

