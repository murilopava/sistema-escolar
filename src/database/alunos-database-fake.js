import { randomUUID } from 'crypto'

export class DatabaseAlunosFake {
  constructor() {
    this.alunos = []
  }

  async create(nome, turma, notas) {
    const id = randomUUID()
    let notaTotal = 0

    for (let indice in notas) {
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
  
    const alunoIndex = this.alunos.findIndex(a => a.id === id)
    if (alunoIndex !== -1) {
      let notaTotal = 0
    
      for (let indice in notas) {
          notaTotal += notas[indice].nota
      }
    
      const media = notas.length > 0 ? notaTotal / notas.length : 0
      this.alunos[alunoIndex] = {id, nome, turma, notas,  media}
      return this.findAll()
    }
    
    return console.log('não encontrou!')
  }
}