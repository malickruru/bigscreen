function estEmailValide(email) {
    // Vérification de la présence d'un "@" et d'un "."
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return false;
    }

    // Vérification de la position de l'@ et du "."
    if (email.indexOf('@') > email.lastIndexOf('.')) {
        return false;
    }

    // Vérification de la longueur minimale
    if (email.length < 5) {
        return false;
    }

    return true;
}


export const Validate = (value, rule, name = '') => {
    // required
    if (!value) {
        return {
            "error": true,
            "message": `Le champs ${name} est requis`
        };
    }

    switch (rule) {
        case 'email':
            if (estEmailValide(value)) {
                return { 'error': false }
            } else {
                return {
                    "error": true,
                    "message": "Veuillez entrer un mail valide"
                }
            }
        case 'number':
            // 
            if (!isNaN(parseFloat(value)) && value >= 0) {
                return { 'error': false }
            } else {
                return {
                    "error": true,
                    "message": "Veuillez entrer une valeur numérique"
                }
            }
        default:
            return { 'error': false }
    }
}