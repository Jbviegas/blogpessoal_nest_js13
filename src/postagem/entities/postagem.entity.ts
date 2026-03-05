import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: 'tb_postagens' })//Criando a tabela no banco de dados / CREATE TABLE tb_postagens
export class Postagem {

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

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
    //A anotação @ManyToOne é usada para definir um relacionamento de muitos para um entre a entidade Postagem e a entidade Tema.
    //A função de retorno de chamada () => Tema é usada para indicar que a entidade relacionada é a entidade Tema.

    //O segundo argumento (tema) => tema.postagem é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Tema tem uma propriedade chamada postagem que se relaciona com a entidade Postagem.

        onDelete: "CASCADE"
    //A opção onDelete: "CASCADE" é usada para definir o comportamento de exclusão em cascata, o que significa que quando um tema for excluído,
    //  todas as postagens associadas a esse tema também serão excluídas automaticamente do banco de dados.
    })
    tema: Tema; // Representa a Chave Estrangeira
}

