export const activeSurvey = (surveys) => {
    return surveys.find((survey) => survey.id == localStorage.getItem("BigScreenActiveSurvey"))
}