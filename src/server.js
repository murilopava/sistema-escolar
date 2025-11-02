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
    
    dbAlunosFake.create(aluno.nome, aluno.turma, aluno.notas, aluno.media)

    dbAlunosFake.findAll();
    return reply.status(201).send(request.body)
    
})

server.put('/aluno/:aluno', (request, reply) => {
    const nomeAluno = request.params.aluno
    const {turma, notas, media} = request.body
    
    const alunoIndex = alunos.findIndex(a => a.nome === nomeAluno);

  if (alunoIndex !== -1) {
    // Atualiza o aluno existente
    alunos[alunoIndex] = { ...alunos[alunoIndex], turma, notas, media };



})

server.listen({
    port: 3000
})