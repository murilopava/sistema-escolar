import { validarEntrada } from '../validators/validators.js'

const validator = new validarEntrada

export async function alunosRoutes (server, dbAlunos) {

    server.get('/alunos', async (request, reply) => {
        const alunos = await dbAlunos.list()

        if (alunos.length === 0) {
            return reply.status(200).send('Nenhum aluno cadastrado')
        }

        reply.status(200).send(alunos)
    })
    
    server.get('/alunos/:id', async (request, reply) => {
        try {
            const id = request.params.id
        
            const alunos = await dbAlunos.search(id)
            if (!alunos) {
                return reply.status(404).send({message: 'Aluno não encontrado!'})
            }
        
            return reply.status(200).send(alunos)
        } catch (err) {
            console.log('Erro ao encontrar aluno, ', err)
            reply.status(500).send({
                message: 'Erro ao encontrar aluno',
                Erro: err.message
            })
        }
    })

    server.post('/alunos/cadastrar', async (request, reply) => {    
        try {
            const aluno = request.body
            validator.validarAluno(aluno)
    
            await dbAlunos.create(aluno)
    
            return reply.status(201).send({
                message: 'Aluno novo cadastrado',
                aluno: request.body})

        } catch (err) {
            console.log('Erro ao cadastrar aluno, ', err)
            reply.status(500).send({
                message: 'Erro ao cadastrar aluno',
                Erro: err.message
            })
        }})

    server.put('/alunos/atualizar/:id', async (request, reply) => {
        try {
            const id = request.params.id
            validator.id(id)

            const aluno = request.body
            validator.validarAluno(aluno)
            
            const alunoAtualizado = await dbAlunos.put(id, aluno.nome, aluno.turma, aluno.notas)
            if (!alunoAtualizado) {
                return reply.status(404).send({message: "Aluno não encontrado!"})
            }
    
            reply.status(200).send({
                message: "Aluno atualizado",
                aluno: aluno.nome
            })
        } catch (err) {
            console.log('Erro ao atualizar aluno: ', err)
            reply.status(500).send({
                message: 'Erro ao atualizar aluno',
                Erro: err.message
            })
        }
    })
    
    server.delete('/alunos/deletar/:id', async (request, reply) => {
        try {
            const id = request.params.id
            
            validator.id(id)
            
            const alunoDeletado = await dbAlunos.delete(id)
            
            if (!alunoDeletado) {
                return reply.status(404).send({message: "Aluno não encontrado!"})
            }
            
            return reply.status(200).send({
                message: "Aluno apagado com sucesso!",
                aluno: alunoDeletado[0]
            })
        } catch (err) {
            console.log('Erro ao deletar aluno', err)
            reply.status(500).send({
                message: 'Erro ao deletar aluno',
                Erro: err.message
            })
        }
    })
}