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

server.listen({
    message: "Porta 3000",
    port: 3000
})