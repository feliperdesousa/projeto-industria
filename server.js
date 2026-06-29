import Fastify from 'fastify'
import { Pool } from 'pg'
import cors from '@fastify/cors'

const servidor = Fastify()

servidor.register(cors, {
origin: '*',
methods: ['GET', 'PUT', 'POST','DELETE']
});

const sql = new Pool({
user: "postgres",
password: "010908",
host: "localhost",
port: 5432,
database: "usuarios"
});



servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuarios')
    return resultado.rows
});


servidor.get('/financeiro', async () => {
    const resultado = await sql.query('select * from financeiro')
    return resultado.rows
});


servidor.post('/login', async (request, reply) => {
    const email = request.body.email;
    const senha = request.body.senha;

    if (!email || !senha) {
        return reply.status(400).send({error: "Email e senha são obrigatórios!"})
    };

    const usuario = await sql.query('select * from usuarios where email = $1',[email]);

    if (usuario.rows.length === 0) {
        return reply.status(404).send({mensagem: "Email ou senha incorretos!"})
    };

    if (usuario.rows[0].senha !== senha) {
        return reply.status(401).send({mensagem: "Email ou senha incorretos!"})
    };

    return reply.status(200).send({mensagem: "Usuário logado com sucesso!"})
});


servidor.post('/cadastrar', async (request, reply) => {
    const nome = request.body.nome;
    const email = request.body.email;
    const senha = request.body.senha;

    if (!nome || !email || !senha) {
        return reply.status(400).send({error: "Nome, email e senha são obrigatórios!"})
    };

    const usuarioExistente = await sql.query('select * from usuarios where email = $1',[email]);

    if (usuarioExistente.rows.length > 0) {
        return reply.status(409).send({mensagem: "Esse email já está cadastrado!"})
    };

    const resultado = await sql.query('insert into usuarios (nome, email, senha) values ($1, $2, $3)',[nome, email, senha]);

    return reply.status(201).send({mensagem: "Usuário cadastrado com sucesso!"})
});


servidor.post('/financeiro', async (request, reply) => {
    const tipo = request.body.tipo;
    const descricao = request.body.descricao;
    const valor = request.body.valor;

    if (!tipo || !descricao || !valor) {
        return reply.status(400).send({error: "Tipo, descrição e valor são obrigatórios!"})
    };

    const resultado = await sql.query('insert into financeiro (tipo, descricao, valor) values ($1, $2, $3)',[tipo, descricao, valor]);

    return reply.status(201).send({mensagem: "Movimentação cadastrada com sucesso!"})
});




servidor.listen({
    port: 3000
});