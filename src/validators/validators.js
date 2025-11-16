export class validarEntrada {
    
    entradaProfessores ({nome, turma, disciplina}) {
        
        if (!nome.trim() || !turma.trim() || !disciplina.trim()) {
            throw new Error('Preencha todos os campos!')
        }
        
        const turmaValida = ['1A', '2A', '1B', '2B']
        const disciplinaValida = ['matemática', 'física', 'português', 'geografia', 'história', 'inglês', 'biologia', 'química']
        
        if (nome.length <= 2 || nome.length > 30) {
            throw new Error('Tamanho de nome de professor inválida.')
        }
        
        for (let indice in turma) {
            if (!turmaValida.includes(turma[indice])) {
                throw new Error('Turma inválida. Use apenas 1A, 2A, 1B ou 2B')
            }
        }
        
        for (let indice in disciplina) {
            if (!disciplinaValida.includes(disciplina[indice])) {
                throw new Error('Disciplina inválida.')
            }
        }
    }
    
    validarAluno({nome, turma, notas}) {
        const turmaValida = ['1A', '2A', '1B', '2B']
        const disciplinaValida = ['matemática', 'física', 'português', 'geografia', 'história', 'inglês', 'biologia', 'química']
        
        if (!nome.trim(), !turma.trim()) {
            throw new Error('Preencha todos os campos')
        }

        
        if (!turmaValida.includes(turma)) {
            throw new Error('Turma inválida')
        }
        
        notas.forEach(elemento => {
            if(!disciplinaValida.includes(elemento.disciplina)) {
                throw new Error(`Disciplina inválida ${elemento.disciplina}`)
            }
            if(elemento.nota > 10 || elemento.nota < 0) {
                throw new Error(`Nota inválida para ${elemento.disciplina}: ${elemento.nota}`)
            }
        });
    }
    
    id (id) {
        if (id.length !== 36) {
            throw new Error('id inválido')
        }
    }
}