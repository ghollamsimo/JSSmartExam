class ClassRequest {
    static validate(data) {
        const errors = [];
        const { formateur_id, etudiant_id, name } = data;

        if (!formateur_id || typeof formateur_id !== 'string') {
            errors.push('Invalid formateur_id');
        }
        if (!etudiant_id || typeof etudiant_id !== 'string') {
            errors.push('Invalid etudiant_id');
        }
        if (!name || typeof name !== 'string') {
            errors.push('Invalid name');
        }

        return errors;
    }
}

export default ClassRequest;