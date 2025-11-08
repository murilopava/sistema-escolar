export async function alunosRoutes (server, dbAlunos) {
    
    server.get('/alunos', async (request, reply) => {
    const alunos = await dbAlunos.search()

    return reply.status(200).send(alunos)
    })

    server.post('/alunos/cadastrar', async (request, reply) => {
        
        const aluno = request.body
        
        await dbAlunos.create(aluno.nome, aluno.turma, aluno.notas)

        await dbAlunos.search();
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

        const alunoDeletado = await dbAlunosFake.delete(id)

        if (!alunoDeletado) {
            return reply.status(404).send({message: "Aluno não encontrado!"})
        }

        return reply.status(200).send({
            message: "Aluno apagado com sucesso!",
            aluno: alunoDeletado
        })
    })
}