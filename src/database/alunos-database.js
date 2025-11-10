import { sql } from './db.js'
import { randomUUID } from 'crypto'
import { calcularMedia } from '../utils/calcularMedia.js'

export class DatabaseAlunos {
    async list() {
        return await sql`SELECT * FROM alunos`
    }

    async create(aluno) {
        const id = randomUUID()
        
        const {nome, turma, notas} = aluno
        const media = calcularMedia(notas)
        
        await sql`INSERT INTO alunos (id, nome, turma, notas, media) 
        VALUES (${id}, ${nome}, ${turma}, ${sql.json(notas)}, ${media})`;
    }

    async search(id) {
        const alunos = await sql`SELECT * FROM alunos WHERE id = ${id}`;
            
        if (alunos.length === 0) {
            return null
        }

        return alunos
    }

    async put(id, nome, turma, notas) {
    const media = calcularMedia(notas)

    const atualizado = await sql`UPDATE alunos SET nome = ${nome}, turma = ${turma}, notas = ${sql.json(notas)}, media = ${media} WHERE id = ${id} RETURNING *;`

    return atualizado.length > 0 ? atualizado[0] : null
  }

  async delete(id) {
    const removido = await sql`DELETE FROM alunos WHERE id = ${id} RETURNING *;`

    return removido.length > 0 ? removido[0] : null
  }
}