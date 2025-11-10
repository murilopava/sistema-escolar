export async function alunosRoutes (server, dbAlunos) {

    server.get('/alunos', async (request, reply) => {
        const alunos = await dbAlunos.list()
        reply.status(200).send(alunos)
    })
    
    server.get('/alunos/:id', async (request, reply) => {
        const id = request.params.id
    
        const alunos = await dbAlunos.search(id)
        if (!alunos) {
            return reply.status(404).send({message: 'Aluno não encontrado!'})
        }

        return reply.status(200).send(alunos)
    })

    server.post('/alunos/cadastrar', async (request, reply) => {
        
        const aluno = request.body
        
        await dbAlunos.create(aluno)

        return reply.status(201).send(request.body)
    })

    server.put('/alunos/atualizar/:id', async (request, reply) => {
        const id = request.params.id
        const aluno = request.body
        
        const alunoAtualizado = await dbAlunos.put(id, aluno.nome, aluno.turma, aluno.notas)
        if (!alunoAtualizado) {
            return reply.status(404).send({message: "Aluno não encontrado!"})
        }

        reply.status(200).send({
            message: "Aluno atualizado",
            aluno: aluno.nome
        })
    })

    server.delete('/alunos/deletar/:id', async (request, reply) => {
        const id = request.params.id

        const alunoDeletado = await dbAlunos.delete(id)

        if (!alunoDeletado) {
            return reply.status(404).send({message: "Aluno não encontrado!"})
        }

        return reply.status(200).send({
            message: "Aluno apagado com sucesso!",
            aluno: alunoDeletado[0]
        })
    })
}