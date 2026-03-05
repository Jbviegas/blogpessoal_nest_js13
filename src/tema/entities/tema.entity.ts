import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({ name: 'tb_temas' })//Criando a tabela no banco de dados / CREATE TABLE tb_temas
export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 10, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE descricao VARCHAR(100) NOT NULL
    @Length(2, 10)//Validação para aceitar apenas textos com comprimento entre 2 e 100 caracteres
    descricao: string;

      @OneToMany( () => Postagem, (postagem) => postagem.tema)
      //A anotação @OneToMany é usada para definir um relacionamento de um para muitos entre a entidade Tema e a entidade Postagem.
    postagem: Postagem[]; 
    //O relacionamento é estabelecido usando a função de retorno de chamada () => Postagem, 
    // que indica que a entidade relacionada é a entidade Postagem.

    //O segundo argumento (postagem) => postagem.tema é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Postagem tem uma propriedade chamada tema que se relaciona com a entidade Tema.
}