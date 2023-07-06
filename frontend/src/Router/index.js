import { createBrowserRouter } from 'react-router-dom';
import CustomerLayout from '../Layout/CustomerLayout'
import SurveyView from '../View/SurveyView.js';
import AnswerView from '../View/AnswerView.js';


const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerLayout />,
      children: [
        {
          path: "/sondage",
          element : <SurveyView />,
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