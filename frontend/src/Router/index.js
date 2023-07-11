import { createBrowserRouter, redirect } from 'react-router-dom';
import CustomerLayout from '../Layout/CustomerLayout'
import SurveyView from '../View/SurveyView.js';
import AnswerView from '../View/AnswerView.js';
import { listAnswerByUser, listQuestion, login, onlineSurvey } from '../Services/Route';
import HomeView from '../View/HomeView';
import AdminLayout from '../Layout/AdminLayout';
import LoginView from '../View/LoginView';



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
    loader : () => {
      if(!localStorage.getItem("BigScreenToken")){
        return  redirect("/login")
      }
      return null;
    }
  },{
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
      return redirect("/administration")
    }
  }
]);

export default router