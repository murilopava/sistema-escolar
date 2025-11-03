import { fastify } from 'fastify'
import { DatabaseAlunos } from './database/alunos-database.js'
import { DatabaseAlunosFake } from './database/alunos-database-fake.js'

const server = fastify()
const dbAlunos = new DatabaseAlunos
const dbAlunosFake = new DatabaseAlunosFake

server.get('/alunos', async (request, reply) => {
  const alunos = await dbAlunosFake.list()

  reply.status(200).send(alunos)
  return alunos
})

server.post('/aluno', (request, reply) => {
    
    const aluno = request.body
    
    dbAlunosFake.create(aluno.nome, aluno.turma, aluno.notas)

    dbAlunosFake.findAll();
    return reply.status(201).send(request.body)
    
})

server.put('/aluno/:aluno', (request, reply) => {
    const id = request.params.aluno
    const aluno = request.body
    
    dbAlunosFake.put(id, aluno.nome, aluno.turma, aluno.notas)
})

server.listen({
    port: 3000
})