import { IsDateString, IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "tb_usuarios" })//Criando a tabela de usuários no banco de dados / CREATE TABLE tb_usuarios 
/* (id int primary key auto_increment, nome varchar(255) not null, usuario varchar(255) not null, senha varchar(255) not null, foto varchar(5000),
 dataNascimento date); */

export class Usuario {//Define a classe Usuario como uma entidade do banco de dados, mapeando-a para a tabela "tb_usuarios".
    //  Cada instância da classe representa um registro nessa tabela.

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"})
    senha: string

    @Column({ length: 5000 })
    @ApiProperty()
    foto: string


    /*@Column({ type: 'date', nullable: true })
    dataNascimento: Date;*/

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}