import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'tb_temas' })//Criando a tabela no banco de dados / CREATE TABLE tb_temas
// (id int primary key auto_increment, descricao varchar(100) not null);

export class Tema {//Define a classe de entidade Tema, que representa a tabela "tb_temas" no banco de dados.
    // Cada instância da classe Tema corresponde a um registro na tabela "tb_temas".
    
    @PrimaryGeneratedColumn()
    @ApiProperty()   
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 10, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE descricao VARCHAR(100) NOT NULL
    @Length(2, 10)//Validação para aceitar apenas textos com comprimento entre 2 e 100 caracteres
    @ApiProperty()   
    descricao: string;


     //A anotação @OneToMany é usada para definir um relacionamento de um para muitos entre a entidade Tema e a entidade Postagem.
      @ApiProperty()   
      @OneToMany( () => Postagem, (postagem) => postagem.tema)//Lá em Postagem, a propriedade tema é do tipo Tema(tema: Tema),
      //  indicando que cada postagem está associada a um tema específico.

    //Essa associação permite que as postagens sejam organizadas e categorizadas com base nos temas aos quais pertencem.

    //O relacionamento é estabelecido usando a função de retorno de chamada () => Postagem, 
    // que indica que a entidade relacionada é a entidade Postagem.
    
    //O segundo argumento (postagem) => postagem.tema é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Postagem tem uma propriedade chamada tema que se relaciona com a entidade Tema.

    postagem: Postagem[]; 
    
}