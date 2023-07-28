// retourne le sondage actuellement analysé
export const activeSurvey = (surveys) => {
    if(surveys.length == 0){
        return {title : ''}
    }
    return surveys.find((survey) => survey.id == localStorage.getItem("BigScreenActiveSurvey"))
}