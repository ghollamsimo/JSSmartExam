class ClassRequest {
    static validate(data) {
        const errors = [];
        const { formateur_id, etudiant_id, name } = data;

        if (!formateur_id || typeof formateur_id !== 'string') {
            errors.push('Invalid formateur_id');
        }

        try {
            JSON.parse(etudiant_id);
        } catch (e) {
            errors.push('Invalid etudiant_id (should be a valid JSON array or object)');
        }

        if (!name || typeof name !== 'string') {
            errors.push('Invalid name');
        }

        return errors;
    }
}

export default ClassRequest;
