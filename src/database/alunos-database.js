import { sql } from './db.js'
import { randomUUID } from 'crypto'

export class DatabaseAlunos {
    async create(nome, turma, notas) {
        const id = randomUUID()
        let indice, notaTotal = 0
        for (indice in notas) {
            notaTotal += notas[indice].nota
        }
        const media = notaTotal / notas.length 

        await sql`INSERT INTO alunos (id, nome, turma, notas, media) 
        VALUES (${id}, ${nome}, ${turma}, ${sql.json(notas)}, ${media})`;
    }

    async search(id) {
        let alunos

        if (id) {
            alunos = await sql`SELECT * FROM alunos WHERE id = ${id}`
        } else {
            alunos = await sql`SELECT * FROM alunos` 
        }

        return alunos
    }

}