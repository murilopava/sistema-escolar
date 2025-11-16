import { validarEntrada } from '../validators/validators.js'

const validator = new validarEntrada

export async function professoresRoutes(server, dbProfessores) {

    server.get('/professores', async (request, reply) => {
        const professores = await dbProfessores.list()

        if (professores.length === 0) {
            return reply.status(200).send({message: 'Nenhum professor cadastrado!'})
        }

        reply.status(200).send(professores) 
    })

    server.get('/professores/:id', async (request, reply) => {
        try {
            const id = request.params.id

            validator.id(id)

            const professores = await dbProfessores.search(id)
            if(!professores) {
                return reply.status(404).send({message: "Professor não encontrado!"})
            }
    
            reply.status(200).send(professores)
        } catch (err) {
            console.log('Erro ao procurar id', err)
            reply.status(500).send({
                message: 'Erro ao encontrar professor',
                Erro: err.message
            })
        }
    })

    server.post('/professores/cadastrar', async (request, reply) => {
        try {
            const professor = request.body
            validator.entradaProfessores(professor)

            const novoProfessor = await dbProfessores.create(professor)

            reply.status(201).send({
                message: "Novo professor cadastrado!",
                professor: novoProfessor
            })

        } catch (err) {
            console.error('Erro ao cadastrar professor:', err)
            return reply.status(500).send({
                message: 'Erro ao cadastrar professor',
                Erro: err.message
            })
        }
    })

    server.put('/professores/atualizar/:id', async (request, reply) => {
        try {
            const id = request.params.id

            validator.id(id)
        
            const professor = request.body

            validator.entradaProfessores(professor)
    
            const professorAtualizado = await dbProfessores.put(id, professor)
    
            if(!professorAtualizado) {
                return reply.status(404).send({message: "Professor não encontrado"})
            }
    
            reply.status(200).send({
                message: "Professor atualizado!",
                professor: professorAtualizado.nome
            })
        } catch (err) {
            console.log('Erro ao atualizar: ', err)
            reply.status(500).send({
                message: 'Erro ao atualizar professor',
                Erro: err.message
            })
        }

    })
    
    server.delete('/professores/deletar/:id', async  (request, reply) => {
        try {
            const id = request.params.id
            validator.id(id)

            const deletado = await dbProfessores.delete(id)
            if (!deletado) {
                return reply.status(404).send({message: "Professor não encontrado"})
            }
    
            reply.status(200).send({
                message: "Professor deletado",
                professor: deletado[0]})
            } catch (err) {
                console.log('Erro ao deletar: ', err)
                reply.status(500).send({
                message: 'Erro ao deletar professor',
                Erro: err.message
            })
            }
    })
}