import { createBrowserRouter } from 'react-router-dom';
import CustomerLayout from '../Layout/CustomerLayout'
import SurveyView from '../View/SurveyView.js';
import AnswerView from '../View/AnswerView.js';
import { listQuestion } from '../Services/Route';



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
        path: "/reponse",
        element: <AnswerView />,
      }
    ],
  },
]);

export default router