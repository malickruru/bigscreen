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
          path: "/sondage",
          element : <SurveyView />,
          loader : async () => {
            let res = await listQuestion.getResponse("1")
            return res.data
          }
        //   lazy : () => import('../View/SurveyView.js')
        },
        {
            path: "reponse",
            element : <AnswerView />,
            // lazy : () => import('../View/AnswerView.js')
          }
      ],
    },
  ]);

export default router