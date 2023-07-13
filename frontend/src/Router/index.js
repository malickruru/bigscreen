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
import{ SurveyView as SurveyAdminView} from '../View/Admin/SurveyView';
import QuestionView from '../View/Admin/QuestionView';



const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
        loader: async () => {
          let res = await onlineSurvey.getResponse()
          return res.data
        }

      },
      {
        path: "/sondage/:id",
        element: <SurveyView />,
        loader: async ({ params }) => {
          let res = await listQuestion.getResponse({'id' : params.id})
          return res.data
        }

      },
      {
        path: "/reponse/:encoded",
        element: <AnswerView />,
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
    loader : async () => {
      if(!localStorage.getItem("BigScreenToken")){
        return  redirect("/login")
      }
      let res = await onlineSurvey.getResponse()
      return res.data;
      
    },
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
        path: "question",
        element: <QuestionView/>,
        loader : async () => {
          let res = await listQuestion.getResponse({id : localStorage.getItem("BigScreenActiveSurvey") })
          return res.data;
        },
      },
      {
        path: "reponse/:page",
        element: <AnswerAdminView/>,
        loader : async ({params}) => {
          let res = await listAnswer.getResponse({surveyId : localStorage.getItem("BigScreenActiveSurvey") , page : params.page})
          return res.data;
        },
      },
      {
        path: "sondage",
        element: <SurveyAdminView/>,
        loader : async () => {
          let res = await listSurvey.getResponse()
          return res.data;
        },
        action : async ({request}) => {
          const Data = Object.fromEntries(await request.formData());
          switch (Data.action) {
            case 'addSurvey':
              let res = await addSurvey.getResponse({},Data)
              if(!res.success ){
                return res.message
              }
              return redirect('../sondage')
            default:
              break;
          }
        }
      },
    ]
  },
  {
    path : "/login",
    element : <LoginView />,
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