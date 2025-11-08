import { REPL_MODE_SLOPPY } from "repl"

export async function professoresRoutes(server, dbProfessores) {
    server.get('/professores/:id', async (request, reply) => {
        const id = request.params.id
        const professores = await dbProfessores.search(id)
        if(!professores) {
            return reply.status(404).send({message: "Professor não encontrado!"})
        }

        reply.status(200).send(professores)
    })

    server.post('/professores/cadastrar', async (request, reply) => {
        const professor = request.body

        const novoProfessor = await dbProfessores.create(professor)
        
        reply.status(201).send({message: "Novo professor cadastrado!",
            professor: novoProfessor
        })
    })

    server.put('/professores/atualizar/:id', async (request, reply) => {
        const id = request.params.id
        const professor = request.body

        const professorAtualizado = await dbProfessores.put(id, professor)

        if(!professorAtualizado) {
            return reply.status(404).send({message: "Professor não encontrado"})
        }

        reply.status(200).send({message: "Professor atualizado!",
            professor: professorAtualizado.nome
        })

    })
    
    server.delete('/professores/deletar/:id', async  (request, reply) => {
        const id = request.params.id

        const deletado = await dbProfessores.delete(id)
        if (!deletado) {
            return reply.status(404).send({message: "Professor não encontrado"})
        }

        reply.status(200).send({
            message: "Professor deletado",
            professor: deletado[0]})
    })
}