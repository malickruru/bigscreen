import { Get, Post} from "./ApiRequest";



// definition des routes , rangées par modèle

// User
let login = new Post(true,'/login');
let loginAdmin = new Post(true,'/login_admin');
let logout = new Post(true,'/logout');
// question
let trySurvey = new Post(true,'/try_survey');
let listQuestion = new Get(true,'/question/list/');
let addQuestion = new Post(true,'/question/add');
let deleteQuestion = new Get(true,'/question/delete/');
// answer
let addAnswer = new Post(true,'/answer/add');
let listAnswerByUser = new Post(true,'/answer/list_by_user');
let AtypeData = new Get(true,'/answer/Atype_data/');
let qualityData = new Get(true,'/answer/quality_data');
let listAnswer = new Get(true,'/answer/list/');
// survey
let listSurvey = new Get(false,'/survey/list');
let addSurvey = new Post(false,'/survey/add');
let releaseSurvey = new Get(false,'/release_survey/');
let editSurvey = new Post(false,'/survey/edit/');
let deleteSurvey = new Get(false,'/survey/delete/');

export { login, loginAdmin, logout, trySurvey, listQuestion, addQuestion, deleteQuestion, addAnswer, listAnswerByUser, AtypeData, qualityData, listAnswer, listSurvey, addSurvey, releaseSurvey, editSurvey, deleteSurvey }