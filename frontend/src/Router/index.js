import { createBrowserRouter, redirect } from 'react-router-dom';
import CustomerLayout from '../Layout/CustomerLayout'
import SurveyView from '../View/SurveyView.js';
import AnswerView from '../View/AnswerView.js';
import { addSurvey, listAnswer, listAnswerByUser, listQuestion, listSurvey, login, logout, onlineSurvey } from '../Services/Route';
import HomeView from '../View/HomeView';
import AdminLayout from '../Layout/AdminLayout';
import LoginView from '../View/LoginView';
import{ HomeView as HomeAdminView} from '../View/Admin/HomeView';
import{ AnswerView as AnswerAdminView} from '../View/Admin/AnswerView';
import{ SurveyView as SurveyAdminView} from '../View/Admin/CRUD_survey/SurveyView';
import QuestionView from '../View/Admin/QuestionView';
import NotFound from '../View/NotFound';


// routeur de l'application

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    // Composant afficher en cas d'url incorrect
    errorElement:<NotFound />,
    children: [
      {
        path: "/",
        element: <HomeView />,
        // données à récupérer lorsque ce lien est appelé
        loader: async () => {
          let res = await onlineSurvey.getResponse()
          return res.data
        }

      },
      {
        path: "/survey/:id",
        element: <SurveyView />,
        // données à récupérer lorsque ce lien est appelé
        loader: async ({ params }) => {
          let res = await listQuestion.getResponse({'id' : params.id})
          return res.data
        }

      },
      {
        path: "/response/:encoded",
        element: <AnswerView />,
        // données à récupérer lorsque ce lien est appelé
        loader: async ({ params }) => {
          let res = await listAnswerByUser.getResponse({'encoded' : params.encoded})
          return res.data
        }
      }
    ],
  },
  {
    path : "/administration",
    element : <AdminLayout />,
    errorElement:<NotFound />,
    // données à récupérer lorsque ce lien est appelé
    loader : async () => {
      // si l'utilisateur n'est pas connecté le rediriger vers login
      if(!localStorage.getItem("BigScreenToken")){
        return  redirect("/login")
      }
      let res = await onlineSurvey.getResponse()
      return res.data;
      
    },
    // Déconnexion de l'utilisateur
    action : async  () => {
      let res = await logout.getResponse({},{
        'email' : localStorage.getItem("BigScreenEmail")
      })
      localStorage.clear()
      return redirect("/login")
    },
    children : [
      {
        path: "",
        element: <HomeAdminView/>,
      },
      {
        path: "questions",
        element: <QuestionView/>,
        // données à récupérer lorsque ce lien est appelé
        loader : async () => {
          let res = await listQuestion.getResponse({id : localStorage.getItem("BigScreenActiveSurvey") })
          return res.data;
        },
      },
      {
        path: "responses/:page",
        element: <AnswerAdminView/>,
        // données à récupérer lorsque ce lien est appelé
        loader : async ({params}) => {
          let res = await listAnswer.getResponse({surveyId : localStorage.getItem("BigScreenActiveSurvey") , page : params.page })
          
          return res.data;
        },
      },
      {
        path: "surveys",
        element: <SurveyAdminView/>,
      },
    ]
  },
  {
    path : "/login",
    errorElement:<NotFound />,
    element : <LoginView />,
    // Connexion
    action : async  ({request}) => {
      const formData = await request.formData()
      const LoginData = Object.fromEntries(formData);
      let res = await login.getResponse({},LoginData)
      if(!res.success ){
        return res.message
      }
      localStorage.setItem("BigScreenToken",res.data.token)
      localStorage.setItem("BigScreenEmail",LoginData.email)
      localStorage.setItem("BigScreenActiveSurvey",1)
      return redirect("/administration")
    }
  }
]);

export default router