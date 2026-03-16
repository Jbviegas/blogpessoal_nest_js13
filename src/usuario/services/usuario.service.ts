import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,//Esse repository é basicamente uma classe pronta com métodos
        // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {//O método findByUsuario() é um método assíncrono que recebe uma string
        //  representando o nome de usuário e retorna uma Promise contendo um objeto do tipo Usuario ou null. 
        // Ele é usado para buscar um usuário no banco de dados com base no nome de usuário fornecido.

        return await this.usuarioRepository.findOne({
            //O método findOne() do TypeORM é usado para buscar um único registro no banco de dados com base em uma condição específica.

            //A propriedade where é usada para especificar a condição de busca, 
            // indicando que o campo usuario deve ser igual ao valor do parâmetro usuario fornecido.
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                postagem: true
            }
        });

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }




    async create(usuario: Usuario): Promise<Usuario> {
        // O método create() é um método assíncrono que recebe um objeto do tipo Usuario e retorna uma Promise contendo um objeto do tipo Usuario. Ele é usado para criar um novo usuário no banco de dados. O parâmetro usuario é um objeto que contém as informações do usuário a ser criado, como nome, nome de usuário, senha, foto e data de nascimento. O método realiza várias validações, como verificar se o nome de usuário já existe e se o usuário tem mais de 18 anos, antes de salvar o novo usuário no banco de dados.
        // Ele é usado para criar um novo usuário no banco de dados.
        // Lógica para criar um novo usuário / Insert into tb_usuarios (nome, usuario, senha, foto, dataNascimento) values (?, ?, ?, ?, ?)

        const buscaUsuario = await this.findByUsuario(usuario.usuario);
        // O método findByUsuario() é chamado para verificar se já existe um usuário com o mesmo nome de usuário no banco de dados.

        if (buscaUsuario)//Se um usuário com o mesmo nome de usuário for encontrado, uma exceção HTTP é lançada HttpException("O Usuario já existe!")
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        // // valida idade
        // const idade = differenceInYears(new Date(), new Date(usuario.dataNascimento));
        // // A função differenceInYears() é usada para calcular a diferença em anos entre a data atual (new Date())
        // //  e a data de nascimento do usuário (new Date(usuario.dataNascimento)).

        // if (idade < 18)//Se a idade calculada for menor que 18 anos, uma exceção HTTP é lançada HttpException("O usuário deve ser maior de 18!")
        //     throw new HttpException(
        //         "O usuário deve ser maior de 18!",
        //         HttpStatus.BAD_REQUEST
        //     );

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
        // A senha do usuário é criptografada usando o método criptografarSenha() da classe Bcrypt antes de ser salva no banco de dados.

        return await this.usuarioRepository.save(usuario);
        // O método save() do TypeORM é usado para salvar o novo usuário no banco de dados.
        // Ele insere um novo registro na tabela "tb_usuarios" com as informações fornecidas no objeto usuario.
        // Ele pode ser usado tanto para criar uma nova entidade quanto para atualizar uma entidade existente, 
        // dependendo se o objeto passado já possui um identificador (id) ou não.
        // Se o objeto tiver um id, o método save() irá atualizar o registro correspondente no banco de dados. 
        // Caso contrário, ele irá criar um novo registro.

        //usuarioRepository é uma variavel privada que contém o repositório do usuario, que é injetado(o Usuario) através do construtor da classe.
        //usuarioRepository é a variável que contém o repositório(Repository) que contém em si o método create para criar um novo usuario
        //e o método save para salvar o usuario criado no banco de dados.
    }



    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

}