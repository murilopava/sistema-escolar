import { randomUUID } from 'crypto'
import { sql } from './db.js'

export class DatabaseProfessores {
    async list() {
        return await sql`SELECT * FROM professores`
    }

    async create(professor) {
        const id = randomUUID()

        const {nome, turma, disciplina} = professor
        await sql`INSERT INTO professores (id, nome, turma, disciplina) VALUES (${id}, ${nome}, ${turma}, ${disciplina})`
    }

    async search(id) {
        const professor = await sql`SELECT * FROM professores WHERE id = ${id}`

        if (professor.length === 0) {
             return null;
        }

        return professor
    }

    async put(id, professor) {
        const {nome, turma, disciplina} = professor

        const atualizado = await sql`UPDATE professores SET nome = ${nome}, turma = ${turma}, disciplina = ${disciplina} WHERE id = ${id} RETURNING *`

        return atualizado.length > 0 ? atualizado[0] : null
    }

    async delete(id) {
        const deletado = await sql`DELETE FROM professores WHERE id = ${id} RETURNING *`

        return deletado.length > 0 ? deletado[0] : null
    }
}