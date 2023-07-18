import { Get, Post} from "./ApiRequest";



// definition des routes , rangées par modèle

// User
let login = new Post(true,'/login');
let logout = new Post(true,'/logout');
// question
let listQuestion = new Get(true,'/survey/:id/questions');
let addQuestion = new Post(false,'/question');
let deleteQuestion = new Get(false,'/question/:id/delete');
// answer
let addAnswer = new Post(true,'/answers');
let listAnswerByUser = new Get(true,'/answers/:encoded');
let AtypeData = new Get(false,'/answer/:id/Atype_data');
let qualityData = new Get(false,'/answer/quality_data');
let listAnswer = new Get(false,'/survey/:surveyId/answers/:page');
// survey
let onlineSurvey = new Get(true,'/surveys/online');
let isSurveyCompleted = new Post(true,'/survey/:id/isCompleted');
let listSurvey = new Get(false,'/surveys');
let addSurvey = new Post(false,'/survey');
let releaseSurvey = new Get(false,'/survey/:id/release');
let editSurvey = new Post(false,'/survey/:id/update');
let deleteSurvey = new Get(false,'/survey/:id/delete');


export { login, logout, listQuestion, addQuestion, deleteQuestion, addAnswer, listAnswerByUser, AtypeData, qualityData, listAnswer, onlineSurvey, isSurveyCompleted, listSurvey, addSurvey, releaseSurvey, editSurvey, deleteSurvey }