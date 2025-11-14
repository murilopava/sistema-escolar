import { fastify } from 'fastify'
import { DatabaseAlunos } from './database/alunos-database.js'
import { alunosRoutes } from './routes/alunos-routes.js'
import { DatabaseProfessores } from './database/professores-database.js'
import { professoresRoutes } from './routes/professores-routes.js'

const server = fastify()

const dbAlunos = new DatabaseAlunos
const dbProfessores = new DatabaseProfessores

alunosRoutes(server, dbAlunos)
professoresRoutes(server, dbProfessores)

try {
    server.listen({
        port: 3000},
    console.log('Rodando na porta 3000'))
} catch(err) {
    console.error('Falha ao iniciar o servidor, erro: ', err)
    process.exit(1)
}