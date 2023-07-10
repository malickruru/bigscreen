import { Get, Post} from "./ApiRequest";



// definition des routes , rangées par modèle

// User
let login = new Post(true,'/login');
let loginAdmin = new Post(true,'/login_admin');
let logout = new Post(true,'/logout');
// question
let listQuestion = new Get(true,'/question/list/');
let addQuestion = new Post(false,'/question/add');
let deleteQuestion = new Get(false,'/question/delete/');
// answer
let addAnswer = new Post(true,'/answer/add');
let listAnswerByUser = new Post(true,'/answer/list_by_user');
let AtypeData = new Get(false,'/answer/Atype_data/');
let qualityData = new Get(false,'/answer/quality_data');
let listAnswer = new Get(false,'/answer/list/');
// survey
let listSurvey = new Get(false,'/survey/list');
let addSurvey = new Post(false,'/survey/add');
let releaseSurvey = new Get(false,'/release_survey/');
let editSurvey = new Post(false,'/survey/edit/');
let deleteSurvey = new Get(false,'/survey/delete/');

export { login, loginAdmin, logout,  listQuestion, addQuestion, deleteQuestion, addAnswer, listAnswerByUser, AtypeData, qualityData, listAnswer, listSurvey, addSurvey, releaseSurvey, editSurvey, deleteSurvey }