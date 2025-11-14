export class validarEntrada {
    
    entradaProfessores ({nome, turma, disciplina}) {
        
        if (!nome || !turma || !disciplina) {
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
        
        if (!nome.trim(), !turma.trim()) {
            throw new Error('Preencha todos os campos')
        }

        
        if (!turmaValida.includes(turma)) {
            throw new Error('Turma inválida')
        }
        
        for (let indice in notas) {
            const entrada = notas[indice].trim() 
            if (entrada === '' || isNaN(entrada) || entrada < 0 || entrada > 10) {
                throw new Error('Nota inválida')
            }
        }
    }
    
    id (id) {
        if (id.length !== 36) {
            throw new Error('id inválido')
        }
    }
}