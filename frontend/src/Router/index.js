import { createBrowserRouter } from 'react-router-dom';
import CustomerLayout from '../Layout/CustomerLayout'
import SurveyView from '../View/SurveyView.js';
import AnswerView from '../View/AnswerView.js';
import { listAnswerByUser, listQuestion } from '../Services/Route';



const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
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
]);

export default router