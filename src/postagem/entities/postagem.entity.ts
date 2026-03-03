import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import {  Transform, TransformFnParams } from "class-transformer";

@Entity({ name: 'tb_postagens' })//Criando a tabela no banco de dados / CREATE TABLE tb_postagens
export class Postagem {

    @PrimaryGeneratedColumn()//Gerar o id automaticamente /PRIMARY KEY id INT AUTO_INCREMENT
    id: number;

    @Transform(({ value }:TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 100, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE titulo VARCHAR(255) NOT NULL
    titulo: string;

     @Transform(({ value }:TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
     @Column({ length: 1000, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE titulo VARCHAR(255) NOT NULL
    texto: string;


    @UpdateDateColumn()//Criar a coluna de data de atualização no banco de dados / CREATE TABLE data DATETIME
    data: Date;

}