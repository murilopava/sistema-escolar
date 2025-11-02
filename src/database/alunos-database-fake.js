import { randomUUID } from 'crypto'

export class DatabaseAlunosFake {
  constructor() {
    this.alunos = []
  }

  async create(nome, turma, notas) {
    const id = randomUUID()
    let indice, notaTotal = 0

    for (indice in notas) {
        notaTotal += notas[indice].nota
    }

    const media = notas.length > 0 ? notaTotal / notas.length : 0

    const aluno = { id, nome, turma, notas, media }
    this.alunos.push(aluno)

    return aluno
  }

  async findAll() {
    console.log(JSON.stringify(this.alunos, null, 2));
  }

  async put(id, nome, turma, notas) {
    const novo = {nome, turma, notas}
    let indice = 0

    const alunoIndex = this.alunos.findIndex(a => a.id === id)
    if aluni
  }
}